import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class BasketModel {
    protected items: IProduct[]

    constructor(protected events: IEvents) {
        this.items = [];
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);

        this.events.emit('basket:changed', this.items);
    }

    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);

        this.events.emit('basket:changed', this.items);
    }

    clear(): void {
        this.items.length = 0;
        
        this.events.emit('basket:changed', this.items);
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