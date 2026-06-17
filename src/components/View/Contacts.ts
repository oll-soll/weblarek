import { Form, IFormActions } from "./Form";

export interface IContactsData {
    email: string;
    phone: string;
}

export interface IContactsActions extends IFormActions {}

export class Contacts extends Form {

    emailInput: HTMLInputElement;
    phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IContactsActions) {

        super(container, actions);

        this.emailInput = container.querySelector('input[name="email"]')!;
        this.phoneInput = container.querySelector('input[name="phone"]')!;
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}