import { BrandModel } from "./brand.model";
import { ImageModel } from "./image.model";

export class ProductModel {
    id!: number;
    name!: string;
    status!: string;
    description!: string;
    screen!: string;
    operatingSystem!: string;
    chip!: string;
    ram!: string;
    internalMemory!: string;
    rearCamera!: string;
    frontCamera!: string;
    brand!: BrandModel;
    image!: ImageModel[];
    deleted!: boolean; 
    price!: number;
    type!: string;
    quantity!: number;
}