import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    inquiryType: InquiryType;
    name: string;
    email: string;
    message: string;
    productInterest: string;
    phone: string;
}
export interface Product {
    id: bigint;
    festivalTag?: FestivalTag;
    name: string;
    isWholesaleAvailable: boolean;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    category: ProductCategory;
    price?: bigint;
}
export enum FestivalTag {
    ganeshPuja = "ganeshPuja",
    wedding = "wedding",
    birthday = "birthday",
    diwali = "diwali",
    dussehra = "dussehra",
    rakhi = "rakhi"
}
export enum InquiryType {
    retail = "retail",
    wholesale = "wholesale"
}
export enum ProductCategory {
    ganeshPujaItems = "ganeshPujaItems",
    photoMala = "photoMala",
    radhaKrishnaPujaItems = "radhaKrishnaPujaItems",
    murtiDecoration = "murtiDecoration",
    birthdayEventDecor = "birthdayEventDecor",
    chundriFabrics = "chundriFabrics",
    weddingAccessories = "weddingAccessories",
    decorativePapers = "decorativePapers",
    thermocolItems = "thermocolItems",
    photoFraming = "photoFraming",
    artificialFlowers = "artificialFlowers",
    rakhiCollection = "rakhiCollection"
}
export interface backendInterface {
    addProduct(name: string, description: string, category: ProductCategory, price: bigint | null, imageUrl: string, isFeatured: boolean, isWholesaleAvailable: boolean, festivalTag: FestivalTag | null): Promise<bigint>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getProductsByFestivalTag(tag: FestivalTag): Promise<Array<Product>>;
    searchProductsByName(name: string): Promise<Array<Product>>;
    seedSampleProducts(): Promise<void>;
    submitInquiry(name: string, phone: string, email: string, message: string, inquiryType: InquiryType, productInterest: string): Promise<bigint>;
}
