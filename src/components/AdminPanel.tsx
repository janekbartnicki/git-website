import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, SelectItem } from '@mantine/core';
import { Product, fetchProducts } from '../utils';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

let products = await fetchProducts();

const convertToSelectId = (): SelectItem[] => {
    const productsArray = products.map(product => {
        return {value: String(product.id), label: product.name};
    });

    return productsArray;
}

const convertToSelectSize = (id: string | null): (SelectItem | string)[] => {
    if(id && products[Number(id) - 1]) {
        const productsArray = products[Number(id) - 1].spec.sizes.map(size => {
                return {value: String(size), label: String(size)};
            }
        )
        return productsArray;
    } else return ['',''];
}

const handleStockSubmit = async (selectedId: string, selectedSize: string, inStock: string): Promise<void> => {
    products = await fetchProducts();
    await setDoc(doc(firestore,  'products', `${selectedId}`), {
        ...products[Number(selectedId) - 1],
        inStock: {
            ...products[Number(selectedId) - 1].inStock,
            [selectedSize]: Number(inStock)
        }
    })
    products = await fetchProducts();
}

const getStock = (id: string | number, size: string | number): number | null => {
    if(id && size && products[Number(id) - 1]) {
        return products[Number(id) - 1].inStock[size];
    } else return null;
}

const renderTable = (products: Product[]): JSX.Element => {
    const renderedList = products.map((product, index) => {
        const { inStock, name } = product;
        const stockKeys = Object.keys(inStock);
        const stockValues = Object.values(inStock);

        const keysArray = stockKeys.map((key, i) => (
            <React.Fragment key={`key_${index}_${i}`}>
                <p className='text-center'>{key}</p>
                <br/>
                <hr/>
            </React.Fragment>
        ));

        const valuesArray = stockValues.map((value, i) => (
            <React.Fragment key={`value_${index}_${i}`}>
                <p className='text-center'>{value}</p>
                <br/>
                <hr/>
            </React.Fragment>
        ));

        return (
            <tr key={`row_${index}`}>
                <th>{name}</th>
                <td className='pr-0 border-r-2 border-gray-200'>{keysArray}</td>
                <td className='pl-0'>{valuesArray}</td>
            </tr>
        )
    });
    return <tbody>{renderedList}</tbody>;
}

const AdminPanel: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>('');
    const [selectedSize, setSelectedSize] = useState<string | null>('');
    const [inStock, setInStock] = useState<string | null>('');

    const sizeInputRef = useRef<HTMLInputElement | null>(null);
    const stockInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(sizeInputRef.current) {
            if(selectedId) {
                sizeInputRef.current.disabled = false;
            } else sizeInputRef.current.disabled = true;
        }
        if(stockInputRef.current) {
            if(selectedId && selectedSize) {
                stockInputRef.current.disabled = false;
                stockInputRef.current.value = String(getStock(selectedId, selectedSize))
            } else stockInputRef.current.disabled = true;
        }
        
    }, [selectedId, selectedSize])

    useEffect(() => {
        setSelectedSize('');
    }, [selectedId])

    return (
        <>
            <h1 className="text-5xl text-center my-10">Panel Administracyjny</h1>
            <div className="flex justify-center my-20">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <Select
                            label="Produkt"
                            placeholder="Wybierz produkt"
                            data={convertToSelectId()}
                            onChange={setSelectedId}
                            value={selectedId}
                        />
                        <Select
                            label="Rozmiar"
                            placeholder="Wybierz produkt"
                            ref={sizeInputRef}
                            data={convertToSelectSize(selectedId)}
                            onChange={setSelectedSize}
                            value={selectedSize}
                        />
                        <label className='mantine-InputWrapper-label mantine-Select-label mantine-1fzet7j'>Ilość w magazynie</label>
                        <Input
                            placeholder="Podaj ilość"
                            ref={stockInputRef}
                            onChange={e => setInStock(e.target.value)}
                            value={String(inStock)}
                        />
                        <div className='form-control mt-5'>
                            <button 
                                type='submit' 
                                className='btn bg-[#3d61aa] text-white hover:text-black' 
                                onClick={() => {
                                    if(selectedId && selectedSize && inStock) {
                                        handleStockSubmit(selectedId, selectedSize, inStock);
                                    }
                                }}>
                                ZAPISZ ZMIANY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto my-20 mb-4 lg:md:mx-44 sm:mx-5">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Rozmiar</th>
                        <th>Ilość w magazynie</th>
                    </tr>
                    </thead>

                    {/* TODO: zrobić tak żeby się odświeżała samodzielnie */}
                    {renderTable(products)}
                </table>
            </div>
        </>
    )
}

export default AdminPanel;