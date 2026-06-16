import { Card, ICardActions } from "./Card";

export interface IBasketCardData {
    index: number;
}

export interface IBasketCardActions extends ICardActions {
    onBasketDelete: () => void;
}

export class BasketCard extends Card {
    
    protected indexElement: HTMLElement;
    protected buttonDelete: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketCardActions) {
        super(container);

        this.indexElement = container.querySelector('.basket__item-index')!;
        this.buttonDelete = container.querySelector('.basket__item-delete')!;

        if (actions?.onBasketDelete) {
            this.buttonDelete.addEventListener('click', actions.onBasketDelete);
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}