import { CatalogModel } from './components/base/Models/CatalogModel';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { BasketModel } from './components/base/Models/BasketModel';
import { BuyerModel } from './components/base/Models/BuyerModel';
import { Api } from './components/base/Api';
import { ApiClient } from './components/base/Models/ApiClient';

const productsModel = new CatalogModel();
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getItems());

const baskModel = new BasketModel();
console.log('Количество товаров в корзине: ', baskModel.getCount());

const byModel = new BuyerModel();
console.log('Ошибки формы: ', byModel.validate());

const api = new Api(import.meta.env.VITE_API_ORIGIN);
const apiClient = new ApiClient(api);

apiClient.getProducts().then((data) => {
    productsModel.setItems(data.items);

    console.log('Каталог товаров с сервера: ', productsModel.getItems());
});