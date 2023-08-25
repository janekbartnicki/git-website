import { useWindowScroll } from '@mantine/hooks';
import { useEffect } from 'react';
import { storage, firestore } from './firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Card from "./components/Card";

// const PRODUCTS_URL = '/data/products.json';

export interface Product {
    id: number;
    name: string;
    model: string;
    inStock: {[key: string]: number},
    spec: {
        cut?: string;
        foam: string;
        latex: string;
        sizes: number[];
    },
    price: number[];
    isNew: boolean;
}

export interface FirestoreUser {
    displayName: string;
    email: string;
    uid: string;
    isAdmin?: boolean;
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

export const getUser = async (uid: string): Promise<FirestoreUser> => {
    try {
        const usersCollectionRef = collection(firestore, 'users');
        const userRef = doc(usersCollectionRef, uid);
        const userSnapshot = await getDoc(userRef);

        const userData = userSnapshot.data();
        return userData as FirestoreUser;
    } catch(error) {
        throw new Error('Failed to fetch products.');
    }
}

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
    const [_ , scrollTo] = useWindowScroll();
    const location = window.location.href;

    useEffect((): void => {
        scrollTo({ y: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return null;
}

const mainImages = await fetchImages('/images/main_images');
//320x240 scale for card image
//515x523 scale for product details images
console.log(mainImages)

export const renderProductsCards = (products: Product[], limit?: number): JSX.Element[] => {
    const productsArray: JSX.Element[] = [];
    if(!limit) {
        for(const {id, name, model, isNew} of products) {
            productsArray.push(
                    <Card 
                        key={id}
                        header={name}
                        desc={model}
                        img={mainImages[id - 1] ? mainImages[id - 1] : '/images/icon_logo.png'}
                        altImg={name}
                        isNew={isNew}
                        link={`/sklep/produkt/${id}`}
                    />
                )
        }
    } else {
        for(let i = 0; i < limit; i++) {
            const {id, name, model, isNew} = products[i];
            productsArray.push(
                <Card 
                    key={id}
                    header={name}
                    desc={model}
                    img={mainImages[id - 1] ? mainImages[id - 1] : '/images/icon_logo.png'}
                    altImg={name}
                    isNew={isNew}
                    link={`/sklep/produkt/${id}`}
                />
            )
        }
    }

    return productsArray;
}