import { ProductModel } from "./product.model";

export class CartDetailModel {
    id!: number;
    product!: ProductModel;
    quantity!: number;
}