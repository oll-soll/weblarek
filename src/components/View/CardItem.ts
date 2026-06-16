import { categoryMap } from '../../utils/constants';
import { ICardActions } from './Card';
import { Card } from './Card';

export interface ICardItemData {
    category: string;
    image: string;
}

export interface ICardItemActions extends ICardActions{
    onItemOpen: () => void;
}

export class CardItem extends Card {
    
    categoryElement: HTMLElement;
    imageElement: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardItemActions) {
        super(container);

        this.categoryElement = container.querySelector('.card__category')!;
        this.imageElement = container.querySelector('.card__image')!;

        if (actions?.onItemOpen) {
            container.addEventListener('click', actions.onItemOpen);
        }
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        this.categoryElement.className = '.card__category';

        if (categoryMap && value in categoryMap) {
            const categoryClass = categoryMap[value as keyof typeof categoryMap];
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set image(value: string) {
        this.imageElement.src = value;
    }
}