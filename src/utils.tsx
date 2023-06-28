import axios from 'axios';
import Card from "./Card";

export interface Product {
    id: number;
    name: string;
    model: string;
    spec: {
        cut?: string;
        foam: string;
        latex: string;
        sizes: number[];
    },
    price: number;
    mainImg: string;
    photos: string;
    isNew: boolean;
}

export const renderProductsCards = (products: Product[], limit?: number): JSX.Element[] => {
    const productsArray: JSX.Element[] = [];
    if(!limit) {
        for(const {id, name, model, mainImg, price, isNew} of products) {
            productsArray.push(
                    <Card 
                        key={id}
                        header={name}
                        desc={model}
                        img={mainImg}
                        price={price}
                        altImg={name}
                        isNew={isNew}
                        link={`/sklep/produkt/${id}`}
                    />
                )
        }
    } else {
        for(let i = 0; i < limit; i++) {
            const {id, name, model, mainImg, price, isNew} = products[i];
            productsArray.push(
                <Card 
                    key={id}
                    header={name}
                    desc={model}
                    img={mainImg}
                    price={price}
                    altImg={name}
                    isNew={isNew}
                    link={`/sklep/produkt/${id}`}
                />
            )
        }
    }

    return productsArray;
}

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<{ products: Product[] }>('/data/products.json');
        return response.data.products;
    } catch (error) {
        throw new Error('Failed to fetch data.');
    }
};