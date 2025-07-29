export type Product = {
    category: string;
    description: string;
    id: number | string;
    image: string;
    price: number;
    rating: {
        count: number;
        rate: number;
    };  
    title: string;
}

