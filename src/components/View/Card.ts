import { Component } from "../base/Component";

export interface ICardData {
    title: string;
    price: number | null;
}

export interface ICardActions {}

export class Card extends Component<ICardData> {
    
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.titleElement = container.querySelector('.card__title')!;
        this.priceElement = container.querySelector('.card__price')!;

    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        if (value === null) {
            this.priceElement.textContent = "Бесценно";
        } else {
            this.priceElement.textContent = `${value} синапсов`;
        }
    }
}