import { CatalogModel } from './components/base/Models/CatalogModel';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { BasketModel } from './components/base/Models/BasketModel';
import { BuyerModel } from './components/base/Models/BuyerModel';

const productsModel = new BuyerModel();
productsModel.validate();

console.log("Ошибки формы: ", productsModel.validate())
