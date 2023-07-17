import axios from 'axios';
import { useWindowScroll } from '@mantine/hooks';
import { useEffect } from 'react';
import { storage, firestore } from './firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { collection, getDocs } from "firebase/firestore";
import Card from "./components/Card";
import { Link } from 'react-router-dom';

// const PRODUCTS_URL = '/data/products.json';

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

//Fetching from public/data file not from external database

// export const fetchProducts = async (): Promise<Product[]> => {
//     try {
//         const response = await axios.get<{ products: Product[] }>(PRODUCTS_URL);
//         return response.data.products;
//     } catch (error) {
//         throw new Error('Failed to fetch data.');
//     }
// };

// export const fetchProducts = async (): Promise<Product[]> => {
//     try {
//         const url = await getDownloadURL(ref(storage, 'products.json'));
//         const response = await axios.get<{ products: Product[] }>(url);
//         return response.data.products;
//     } catch (error) {
//         throw new Error('Failed to fetch data.');
//     }
// };

export const fetchProducts = async (): Promise<Product[]> => {
    const products: Product[] = [];
    try {
        const querySnapshot = await getDocs(collection(firestore, "products"));

        querySnapshot.forEach((doc) => {
            products.push(doc.data() as Product);
        });
    
        return products;
    } catch (error) {
        throw new Error('Failed to fetch products.');
    }
}

export const fetchImages = async (endpoint = 'images/'): Promise<string[] | string> => {
    try {
        const storageRef = ref(storage, endpoint);
        const imagesList = await listAll(storageRef);
        
        const imagesUrl: string[] = [];
        
        if(imagesList.items.length) {
            for (const photo of imagesList.items) {
                const downloadURL = await getDownloadURL(photo);
                imagesUrl.push(downloadURL);
            }

            return imagesUrl;
        } else {
            return await getDownloadURL(ref(storage, endpoint));
        }

    } catch (error) {
        throw new Error('Failed to fetch images.');
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

//badges

export const renderSuccess = (message: string): JSX.Element => {
    return (
        <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
            <div className="alert alert-success shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3>{message}</h3>
                <Link to='/'><button className="btn btn-sm">Przejdź do strony głównej</button></Link>
            </div>
        </div>
    )
}