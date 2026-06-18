import { EventEmitter } from './components/base/Events';
import { CatalogModel } from './components/Models/CatalogModel';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { Api } from './components/base/Api';
import { ApiClient } from './components/Models/ApiClient';
import { API_URL } from './utils/constants';

const events = new EventEmitter();

const productsModel = new CatalogModel(events); 
const baskModel = new BasketModel(events);
const byModel = new BuyerModel(events); 

const api = new Api(API_URL);
const apiClient = new ApiClient(api);

apiClient.getProducts()
    .then((data) =>{
        productsModel.setItems(data.items);
    })
    .catch((err) => {
        console.error('Ошибка загрузки каталога товаров:', err);
    });