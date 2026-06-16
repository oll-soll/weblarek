import { Component } from "../base/Component";

export interface IHeaderData {
    counter: number;
}

export interface IHeaderActions {
    onBasketOpen: () => void;
}

export class Header extends Component<IHeaderData> {

    protected counterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IHeaderActions) {
        super(container); 

        this.counterElement = container.querySelector('.header__basket-counter')!;
        this.basketButton = container.querySelector('.header__basket')!;

        if (actions?.onBasketOpen) {
            this.basketButton.addEventListener('click', actions.onBasketOpen);
        }
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}