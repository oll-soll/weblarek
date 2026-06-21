import { Component } from "../base/Component";

export interface IBasketData {
    total: number;
    items: HTMLElement[];
}

export interface IBasketActions {
    onOrderAction: () => void;
}

export class Basket extends Component<IBasketData> {

    protected listElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement, actions?: IBasketActions) {
        super(container);

        this.listElement = container.querySelector('.basket__list')!;
        this.basketButton = container.querySelector('.basket__button')!;
        this.priceElement = container.querySelector('.basket__price')!;

        if (actions?.onOrderAction) {
            this.basketButton.addEventListener('click', actions.onOrderAction);
        }
    }

    set items(value: HTMLElement[]) {
        if (value.length > 0) {
            this.listElement.replaceChildren(...value);
            this.basketButton.removeAttribute('disabled');
        } else {
            const emptyNotice = document.createElement('p');
            emptyNotice.textContent = 'Корзина пуста';
            this.listElement.replaceChildren(emptyNotice);

            this.basketButton.setAttribute('disabled', 'true');
        }
    }

    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }
}