import { Component } from "../base/Component";

export interface IModalData {
    content: HTMLElement;
}

export interface IModalActions {
    onModalClose: () => void;
}

export class Modal extends Component<IModalData> {
    
    protected modalContent: HTMLElement;
    protected modalButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IModalActions) {
        
        super(container)

        this.modalContent = container.querySelector('.modal__content')!;
        this.modalButton = container.querySelector('.modal__close')!;

        this.modalButton.addEventListener('click', () => {
            this.close();
            if (actions?.onModalClose) {
                actions.onModalClose();
            }
        })

        container.addEventListener('click', (event) => {
            if (event.target === container) {
                this.close();
                if (actions?.onModalClose) {
                    actions.onModalClose();
                }
            }
        });
    }

    set content(value: HTMLElement) {
        this.modalContent.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.content = document.createElement('div');
    }
}