import { Contacts } from './components/View/Contacts';
import { CardItem } from './components/View/CardItem';
import { EventEmitter } from './components/base/Events';
import { CatalogModel } from './components/Models/CatalogModel';
import './scss/styles.scss';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { Api } from './components/base/Api';
import { ApiClient } from './components/Models/ApiClient';
import { API_URL } from './utils/constants';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { cloneTemplate } from './utils/utils';
import { IProduct, TPayment } from './types';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Preview } from './components/View/Preview';
import { BasketCard } from './components/View/BasketCard';
import { Order } from './components/View/Order';
import { OrderSuccess } from './components/View/OrderSuccess';
import { CDN_URL } from './utils/constants';

const events = new EventEmitter();

const productsModel = new CatalogModel(events); 
const baskModel = new BasketModel(events);
const byModel = new BuyerModel(events); 

const api = new Api(API_URL);
const apiClient = new ApiClient(api);

const modalContainer = document.querySelector('#modal-container') as HTMLElement;
const modal = new Modal(modalContainer);

const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const basket = new Basket(cloneTemplate(basketTemplate), {
    onOrderAction: () => {
        events.emit('order:open')
    }
});

const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const galleryContainer = document.querySelector('.gallery') as HTMLElement;
const headerContainer = document.querySelector('.header') as HTMLElement;

const gallery = new Gallery(galleryContainer);
const header = new Header(headerContainer, {
    onBasketOpen: () => {
        const basketHtml = basket.render();
        modal.content = basketHtml;
        
        modal.open();
    }
});

const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;

const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const orderForm = new Order(cloneTemplate(orderTemplate), {
    onCardClick: () => {
        byModel.setField('payment', 'card');
    },
    onCashClick: () => {
        byModel.setField('payment', 'cash');
    },
    onSubmit: () => {
        events.emit('contacts:open');
    },
    onInputChange: (field, value) => {
        byModel.setField(field as any, value);
    }
});

const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const contactsForm = new Contacts(cloneTemplate(contactsTemplate), {
    onSubmit: () => {
        events.emit('order:submit');
    },
    onInputChange: (field, value) => {
        byModel.setField(field as any, value);
    }
});

const cardPreviewElement = cloneTemplate(cardPreviewTemplate);
    const previewCard = new Preview(cardPreviewElement, {
        onButtonPreview: () => {
            events.emit('preview:submit');
    }
});

events.on('catalog:changed', (items: IProduct[]) => {
    const cardsArray: HTMLElement[] = []; 
        for (const item of items) {
            const cardElement = cloneTemplate(cardCatalogTemplate);
            const card = new CardItem(cardElement, {
                onItemOpen: () => {
                    events.emit('card:select', item);
                }
            });

            card.title = item.title;
            card.price = item.price;
            card.image = CDN_URL + item.image;
            card.category = item.category;
            
            const readyHtml = card.render();
            cardsArray.push(readyHtml);
    }

    gallery.catalog = cardsArray;
});

events.on('card:select', (item: IProduct) => {
    productsModel.setPreview(item);
});

events.on('preview:submit', () => {
    const previewItem = productsModel.getPreview();
    if (!previewItem) return;

    if (baskModel.hasItem(previewItem.id)) {
                baskModel.removeItem(previewItem.id);
                previewCard.buttonText = 'В корзину';
            } else {
                baskModel.addItem(previewItem);
                previewCard.buttonText = 'Удалить из корзины';
            }
});

events.on('preview:changed', (item: IProduct) => {
    previewCard.title = item.title;
    previewCard.price = item.price;
    previewCard.image = CDN_URL + item.image;
    previewCard.category = item.category;
    previewCard.text = item.description;

    if (item.price === null) {
        previewCard.buttonText = 'Недоступно';
        previewCard.disabledButton = true;
    } else if (baskModel.hasItem(item.id)) {
        previewCard.buttonText = 'Удалить из корзины';
        previewCard.disabledButton = false;
    } else {
        previewCard.buttonText = 'Купить';
        previewCard.disabledButton = false;
    }
    
    modal.content = previewCard.render();
    
    modal.open()
});

events.on('basket:changed', () => {
    header.counter = baskModel.getCount();
    const itemsInBasket = baskModel.getItems();
    const basketCardsArray: HTMLElement[] = [];
    
    itemsInBasket.forEach((item, index) => {
        const CardElement = cloneTemplate(cardBasketTemplate);
        const cardBasket = new BasketCard(CardElement, {
            onBasketDelete: () => {
                baskModel.removeItem(item.id);
            }
        });

        cardBasket.title = item.title;
        cardBasket.price = item.price;
        cardBasket.index = index + 1;
        
        basketCardsArray.push(cardBasket.render());
    });
    
    basket.items = basketCardsArray;
    basket.total = baskModel.getTotalPrice();
});

events.on('order:open', () => {
    modal.content = orderForm.render();
});

events.on('contacts:open', () => {
    modal.content = contactsForm.render();
});

events.on('buyer:changed', () => {
    const errors = byModel.validate();

    const orderErrors = errors.payment || errors.address;
    orderForm.valid = !orderErrors;
    
    const contactsErrors = errors.email || errors.phone;
    contactsForm.valid = !contactsErrors;

    const currentData = byModel.getData();
    orderForm.payment = currentData.payment;
    orderForm.address = currentData.address;

    contactsForm.email = currentData.email;
    contactsForm.phone = currentData.phone;
});

events.on('order:submit', () => {
    const buyerData = byModel.getData();

    const orderData = {
        payment: buyerData.payment as TPayment,
        address: buyerData.address,
        email: buyerData.email,
        phone: buyerData.phone,
        total: baskModel.getTotalPrice(),
        items: baskModel.getItems().map(item => item.id)
    };

    apiClient.postOrder(orderData)
        .then((res) => {
            const successTemplate = document.querySelector('#success') as HTMLTemplateElement;
            const successOrder = new OrderSuccess(cloneTemplate(successTemplate), {
                onOrderSuccessClose: () =>{
                    modal.close();
                }
            });

            successOrder.total = res.total;

            baskModel.clear();
            byModel.clear();

            modal.content = successOrder.render();
        })
        .catch((err) => {
            console.error('Ошибка при отправке заказа:', err);
        });
});

apiClient.getProducts()
    .then((data) =>{
        productsModel.setItems(data.items);
    })
    .catch((err) => {
        console.error('Ошибка загрузки каталога товаров:', err);
    });