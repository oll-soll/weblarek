import { IProduct } from '../../../types/index';

export class BasketModel {
    protected items: IProduct[]

    constructor() {
        this.items = [];
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
    }

    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    clear(): void {
        this.items.length = 0;
    }

    getTotalPrice(): number {
        return this.items.reduce((acc, item) => {
            if (item.price !== null) {
                return acc + item.price; 
            }
            return acc;
        }, 0);
    }

    getCount(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}