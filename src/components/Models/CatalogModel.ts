import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class CatalogModel {
    protected items: IProduct[];
    protected preview: IProduct | null;

    constructor(protected events: IEvents) {
        this.items = [];
        this.preview = null;
    }

    setItems(items: IProduct[]): void {
        this.items = items;

        this.events.emit('catalog:changed', this.items)
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    setPreview(item: IProduct): void {
        this.preview = item;

        this.events.emit('preview:changed', this.preview);
    }

    getPreview(): IProduct | null {
        return this.preview;
    }
}