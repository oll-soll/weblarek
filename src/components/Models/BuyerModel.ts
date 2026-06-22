import { TPayment, IBuyer } from "../../types";
import { IEvents } from "../base/Events";

type ValidationErrors = Partial<Record<string, boolean>>;

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
            errors.payment = true;
        }

        if (!this.address) {
            errors.address = true;
        }

        const phoneCheck = this.phone ? this.phone.replace(/\D/g, '').length : 0;
        if (!this.phone) {
            errors.phone = true;
        } else if (phoneCheck < 10) {
            errors.phone = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
            errors.email = true;
        } else if (!emailRegex.test(this.email)) {
            errors.email = true;
        }

        return errors;
    }
}