import { CatalogModel } from './components/Models/CatalogModel';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { Api } from './components/base/Api';
import { ApiClient } from './components/Models/ApiClient';
import { API_URL } from './utils/constants';

const productsModel = new CatalogModel(); // 1. Класс CatalogModel()
productsModel.setItems(apiProducts.items); // метод setItems

console.log('Массив товаров из каталога: ', productsModel.getItems()); // метод getItems

if (apiProducts.items.length > 0) { // метод getItemById
    const firstItem = apiProducts.items[0].id;
    const foundItem = productsModel.getItemById(firstItem);
    console.log(`Товар, найденный по id ({firstItem}):`, foundItem);
} else {
    console.log('Массив пуст, поиск по id невозможен');
}

if (apiProducts.items.length > 0) {
    const itemPreview = apiProducts.items[0];
    productsModel.setPreview(itemPreview); // метод setPreview
    console.log(`Товар для подробного отображения:`, productsModel.getPreview()); // метод getPreview
}

const baskModel = new BasketModel(); // 2. Класс BasketModel

if (apiProducts.items.length > 1) {
    const firstItem = apiProducts.items[0];
    const secondItem = apiProducts.items[1];

    baskModel.addItem(firstItem); // метод addItem
    baskModel.addItem(secondItem);
    console.log('Товары в корзине:', baskModel.getItems()); // метод getItems

    console.log('Количество товаров в корзине: ', baskModel.getCount()); // метод getCount

    console.log('Общая стоимость товаров в корзине', baskModel.getTotalPrice()); // метод getTotalPrice

    console.log('Проверка наличия товара в корзине:', baskModel.hasItem(firstItem.id)); // метод hasItem

    console.log(`Удаление товара ${firstItem.title} из корзины:`, baskModel.removeItem(firstItem.id)) // метод removeItem
    console.log('Количество товаров в корзине: ', baskModel.getCount());

    baskModel.clear() // метод clear()
    console.log('Количество товаров в корзине: ', baskModel.getCount());
} else {
    console.log('Проверка методов невозможна, недостаточно данных');
}

const byModel = new BuyerModel(); // 3. Класс BuyerModel

console.log('Ошибки формы: ', byModel.validate()); // метод validate

byModel.setField('payment', 'card'); // метод setField
byModel.setField('address', 'г. Пермь, ул. Грибоедова, 72');
byModel.setField('phone', '89999999999');
byModel.setField('email', 'solyaolya@yandex.ru');
console.log('Ошибки формы после заполнения: ', byModel.validate());

console.log('Данные покупателя:', byModel.getData()); // метод getData

byModel.clear();
console.log('Ошибки формы после очистки формы: ', byModel.validate()); // метод validate

const api = new Api(API_URL);
const apiClient = new ApiClient(api);

apiClient.getProducts().then((data) => {
    productsModel.setItems(data.items);

    console.log('Каталог товаров с сервера: ', productsModel.getItems());
})
.catch((err) => {
    console.error('Ошибка загрузки каталога товаров:', err);
});