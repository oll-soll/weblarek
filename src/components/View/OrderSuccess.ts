import { Component } from "../base/Component";

export interface IOrderSuccessData {
    total: number;
}

export interface IOrderSuccessActions {
    onOrderSuccessClose: () => void;
}

export class OrderSuccess extends Component<IOrderSuccessData> {

    protected successButton: HTMLButtonElement;
    protected successTotal: HTMLElement;

    constructor(container: HTMLElement, actions?: IOrderSuccessActions) {
        super(container);

        this.successButton = container.querySelector('.button.order-success__close')!;
        this.successTotal = container.querySelector('.order-success__description')!;

        if (actions?.onOrderSuccessClose) {
            this.successButton.addEventListener('click', actions.onOrderSuccessClose);
        }
    }

    set total(value: number) {
        this.successTotal.textContent = `Списано ${value} синапсов`;
    }
}