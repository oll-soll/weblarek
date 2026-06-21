import { TPayment, IBuyer } from "../../types";
import { IEvents } from "../base/Events";

type ValidationErrors = Partial<Record<keyof IBuyer, string>>;

export class BuyerModel {
    payment: TPayment | null;
    address: string;
    phone: string;
    email: string;

    constructor(protected events: IEvents) {
        this.payment = null;
        this.address = '';
        this.phone = '';
        this.email = '';
    }

    setField(field: keyof BuyerModel, value: string | TPayment): void {
        (this as any)[field] = value;

        this.events.emit('buyer:changed', {
            data: this.getData(),
            errors: this.validate()
        });
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
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

        this.events.emit('buyer:changed');
    }

    validate(): ValidationErrors {
        const errors: ValidationErrors = {};

        if (!this.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }

        if (!this.address) {
            errors.address = 'Необходимо указать адрес';
        }

        const phoneCheck = this.phone ? this.phone.replace(/\D/g, '').length : 0;
        if (!this.phone) {
            errors.phone = 'Укажите номер телефона';
        } else if (phoneCheck < 10) {
            errors.phone = 'Некорректный номер телефона';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
            errors.email = 'Пустой email';
        } else if (!emailRegex.test(this.email)) {
            errors.email = 'Некорректный формат email';
        }

        return errors;
    }
}