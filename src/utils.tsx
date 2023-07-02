import axios from 'axios';
import { useWindowScroll } from '@mantine/hooks';
import { useEffect } from 'react';
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
    price: number[];
    mainImg: string;
    photos: string;
    isNew: boolean;
}

export const renderProductsCards = (products: Product[], limit?: number): JSX.Element[] => {
    const productsArray: JSX.Element[] = [];
    if(!limit) {
        for(const {id, name, model, mainImg, isNew} of products) {
            productsArray.push(
                    <Card 
                        key={id}
                        header={name}
                        desc={model}
                        img={mainImg}
                        altImg={name}
                        isNew={isNew}
                        link={`/sklep/produkt/${id}`}
                    />
                )
        }
    } else {
        for(let i = 0; i < limit; i++) {
            const {id, name, model, mainImg, isNew} = products[i];
            productsArray.push(
                <Card 
                    key={id}
                    header={name}
                    desc={model}
                    img={mainImg}
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


export const AutoScroll: React.FC = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const location = window.location.href;

    useEffect((): void => {
        scrollTo({ y: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return null;
}