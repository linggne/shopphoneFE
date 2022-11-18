import { AddressModel } from "./address.model";
import { CartModel } from "./cart.model";

export class OrderModel {
    id!: number;
    createdAt!: Date;
    note!: string;
    totalPrice!: number;
    typePayment!: string;
    cart!: CartModel;
    address!: AddressModel;
    status!: string;
}