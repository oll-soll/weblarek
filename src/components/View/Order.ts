import { Form, IFormActions } from "./Form";

export interface IOrderData {
    address: string;
    payment: string | null;
}

export interface IOrderActions extends IFormActions {
    onCardClick: () => void;
    onCashClick: () => void;
}

export class Order extends Form {

    cardButton: HTMLButtonElement;
    cashButton: HTMLButtonElement;
    addressInput: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IOrderActions) {
        super(container, actions);

        this.cardButton = container.querySelector('button[name="card"]')!;
        this.cashButton = container.querySelector('button[name="cash"]')!;
        this.addressInput = container.querySelector('input[name="address"]')!;

        this.cardButton.addEventListener('click', () => {
            if (actions?.onCardClick) {
                actions.onCardClick();
            }
        });

        this.cashButton.addEventListener('click', () => {
            if (actions?.onCashClick) {
                actions.onCashClick();
            }
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }

    set payment(value: string | null) {
        this.cardButton.classList.toggle('button_alt-active', value === 'card');

        this.cashButton.classList.toggle('button_alt-active', value === 'cash');
    }
}
