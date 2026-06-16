import { Card, ICardActions } from "./Card";
import { categoryMap } from "../../utils/constants";

export interface IPreviewData {
    image: string;
    category: string;
    text: string;
}

export interface ICardPreviewActions extends ICardActions {
    onButtonPreview: () => void;
}

export class Preview extends Card {

    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected textElement: HTMLElement;
    protected buttonPreview: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardPreviewActions) {
        super(container);

        this.imageElement = container.querySelector('.card__image')!;
        this.categoryElement = container.querySelector('.card__category')!;
        this.textElement = container.querySelector('.card__text')!;
        this.buttonPreview = container.querySelector('.button.card__button')!;

        if (actions?.onButtonPreview) {
            this.buttonPreview.addEventListener('click', actions.onButtonPreview);
        }
    }

    set image(value:string) {
        this.imageElement.src = value;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        this.categoryElement.className = 'card__category';

        if (categoryMap && value in categoryMap) {
            const categoryClass = categoryMap[value as keyof typeof categoryMap];
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set text(value: string) {
        this.textElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonPreview.textContent = value;
    }
}