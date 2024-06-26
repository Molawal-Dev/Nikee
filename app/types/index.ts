export interface productTypes {
    _id: string;
    price: number;
    name: string;
    rating: number;
    slug: string;
    productCategory: string;
    itemCategory: string;
    imageUrl: string;
}

export interface productFullDetailTypes {
    _id: string;
    price: number;
    name: string;
    rating: number;
    ratingNumber: number;
    slug: string;
    productCategory: string;
    itemCategory: string;
    description: string;
    images: any;
    imageUrl: string;
}