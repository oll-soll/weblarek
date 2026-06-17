import { Component } from "../base/Component";

export interface IFormData {
    errors: string;
    valid: boolean;
}

export interface IFormActions {
    onSubmit: () => void;
}

export class Form extends Component<IFormData> {

    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLElement, actions?: IFormActions) {
        super(container);

        this.submitButton = container.querySelector('button[type="submit"]')!;
        this.errorsElement = container.querySelector('.form__errors')!;

        container.addEventListener('submit', (event) => {
            event.preventDefault();

            if (actions?.onSubmit) {
                actions.onSubmit();
            }
        });

        container.addEventListener('input', (event) => {})
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }
}