import { TPayment } from "../../../types";
import { IBuyer } from "../../../types";

export class BuyerModel {
    payment: TPayment | null;
    address: string;
    phone: string;
    email: string;

    constructor() {
        this.payment = null;
        this.address = '';
        this.phone = '';
        this.email = '';
    }

    setField(field: keyof BuyerModel, value: string | TPayment): void {
        (this as any)[field] = value;
    }

    getData(): IBuyer {
        return {
            payment: this.payment as TPayment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        }
    }

    clear(): void {
        this.payment = null;
        this.address = '';
        this.phone = '';
        this.email = '';
    }

    validate(): Record<string, string> {
        const errors: Record<string, string> = {};

        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }

        if (!this.phone) {
            errors.phone = 'Укажите номер телефона';
        }

        if (!this.email) {
            errors.email = 'Укажите email';
        }

        return errors;
    }
}