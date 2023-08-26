import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct, clearCart, removeProduct } from '../store/slices/cartSlice';
import ReactTextTransition, { presets } from 'react-text-transition';
import { GrNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { fetchImages, fetchProducts } from '../utils';
import { getFunctions, httpsCallable } from "firebase/functions";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { MdLocalShipping } from 'react-icons/md'
import { app } from '../firebase';

const images = await fetchImages('/images/main_images');

const functions = getFunctions(app, 'europe-central2');
const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');
const stripePromise = loadStripe('pk_test_51NY55lAAC5bkRmwWvGC7xMRIi9GGTD4Rjyx9xPOMeDhmmnPG9uJ79MDBrdCmFxUo0XcR7sLLmcincoaRLFIFqDRn00Bzx0JShe');

// interface ShippingInfo {
//     city: string;
//     street: string;
//     houseNumber: string;
//     apartmentNumber?: string;
//     postalCode: string;
// }

const stockDoubleCheck = async (cartProducts: CartProduct[]): Promise<boolean> => {
    const databaseProducts = await fetchProducts();

    for (const cartProduct of cartProducts) {
        const matchingProduct = databaseProducts.find(product => product.id === cartProduct.id);
        if(!matchingProduct?.inStock[cartProduct.size]) return false;
        if (!matchingProduct || 
            !matchingProduct.spec.sizes.includes(cartProduct.size) || 
            cartProduct.quantity > matchingProduct.inStock[cartProduct.size]) {
            return false;
        }
    }
    return true; 
}

const Cart: React.FC = () => {
    const cartState = useSelector<RootState, CartProduct[]>(state => state.cart);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    // const [city, setCity] = useState<string>('');
    // const [street, setStreet] = useState<string>('');
    // const [houseNumber, setHouseNumber] = useState<string>('');
    // const [apartmentNumber, setApartmentNumber] = useState<string>('');
    // const [postalCode, setPostalCode] = useState<string>('');

    const dispatch = useDispatch();
    let sum = 0;
    let amountOfItems = 0;

    const handleCheckout = async () => {
        if(!cartState.length) return;
        if(!(await stockDoubleCheck(cartState))) {
            setErrorMessage('Brak produktu na stanie magazynowym. Wyczyść koszyk i spróbuj jeszcze raz.');
            setError(true);
            return;
        }
        if(cartState.length > 5) {
            setErrorMessage('Ilość różnych pozycji w koszyku nie może przekroczyć pięciu. Rekomendujemy rozdzielić zamówenia na parę osobnych.');
            setError(true);
            return;
        }

        const stripe = await stripePromise;

        setIsSubmitted(true);

        createStripeCheckout(
            {
                cart: cartState
            }
        )
            .then((response: any) => {
                const sessionId = response.data.id;
                stripe?.redirectToCheckout({sessionId});
            })
            .catch(error => console.error(error));
    }

    const handleDelete = (id: number, size: number): void => {
        dispatch(removeProduct({id, size}));
    }

    const renderEmpty = (): JSX.Element | null => {
        if(cartState.length === 0) {
            return (
                <div className='text-center text-gray-400 my-10'>
                    Koszyk jest pusty.
                </div>
            );
        } else return null;
    }
    
    const renderTable = (): JSX.Element[] | null => {
        if(cartState.length !== 0) {
            let itemsCount = 0;
    
            const itemsList =  cartState.map(item => {
                itemsCount += 1;
                amountOfItems += item.quantity;
                sum += item.price * item.quantity;
                return (
                    <tr key={itemsCount}>
                        <td className='flex justify-start'><img className='w-8 h-8 m-5 mask mask-squircle' src={images && images[item.id - 1] ? images[item.id - 1] : '/images/icon_logo.png'}/>
                            <p className='m-5 hover:underline'><Link to={`/sklep/produkt/${item.id}`}>{item.name}</Link></p>
                        </td>
                        <td>{item.size}</td>
                        <td>{item.quantity} szt.</td>
                        <td>{item.price * item.quantity} zł</td>
                        <td className='w-20'><button className='btn bg-red-700 text-white w-15 h-10 m-1 hover:text-black' onClick={() => handleDelete(item.id, item.size)}>USUŃ</button></td>
                    </tr>
                )
            })
            
            return itemsList;
        } else return null;
    }

    return (
        <>
            <h1 className="text-center text-5xl my-16">Twój koszyk</h1>
            <div className="overflow-x-auto my-20 mb-4 lg:md:mx-44 sm:mx-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Rozmiar</th>
                            <th>Ilość</th>
                            <th>Cena</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    {renderTable()}
                    </tbody>
                </table>
                {renderEmpty()}
            </div>
            <div className='text-center text-red-600'>{error && errorMessage ? errorMessage : null}</div>
            <div className='flex md:lg:justify-end justify-center mx-48 my-5'>
                <button 
                    className='btn hover:text-black'
                    onClick={() => dispatch(clearCart())}    
                >
                    WYCZYŚĆ KOSZYK
                </button>
            </div>
            {/* <div className="flex lg:md:justify-end justify-center lg:md:mx-40 lg:md:my-20"> */}
            <div className="flex lg:md:justify-between justify-center align-middle items-center lg:md:items-start my-10 lg:md:flex-row flex-col flex-wrap lg:md:mx-40 lg:md:my-20 gap-5">
                <div className='lg:md:mx-10 mx-5 shadow-md p-5 rounded-2xl'>
                    <h3 className='text-xl font-bold flex flex-nowrap align-middle justify-between items-center gap-1'>
                        Ważna informacja
                        <MdLocalShipping className="w-6 h-6 mt-1"/>
                    </h3>
                    <div className="form-control lg:md:w-96 w-full">
                        <p>
                            <br/>
                            Koszt wysyłki wynosi <b>15 zł</b>.<br/>
                            <span className='text-slate-400'>Dane adresowe podawane są w procesie płatności po kliknięciu przycisku "przejdź do płatności".</span><br/><br/>
                            Jeżeli posiadasz <b>kod promocyjny</b> będzie on możliwy do wprowadzenia po kliknięciu przycisku "przejdź do płatonści".
                        </p>
                        {/* <label className="label">
                            <span className="label-text">Miasto</span>
                        </label>
                        <input type="text"
                            placeholder="Wprowadź nazwę miasta..."
                            className="input input-bordered"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            required
                        />
                        <label className="label">
                            <span className="label-text">Ulica</span>
                        </label>
                        <input 
                            type="text"
                            placeholder="Wprowadź nazwę ulicy..."
                            className="input input-bordered"
                            onChange={e => setStreet(e.target.value)}
                            value={street}
                            required
                        />
                        <label className="label">
                            <span className="label-text">Numer domu</span>
                        </label>
                        <input type="text"
                            placeholder="Wprowadź numer domu..."
                            className="input input-bordered"
                            onChange={e => setHouseNumber(e.target.value)}
                            value={houseNumber}
                            required
                        />
                        <label className="label">
                            <span className="label-text">Numer mieszkania *</span>
                        </label>
                        <input type="text"
                            placeholder="Wprowadź numer mieszkania..."
                            className="input input-bordered"
                            onChange={e => setApartmentNumber(e.target.value)}
                            value={apartmentNumber}
                        />
                        <label className="label">
                            <span className="label-text">Kod pocztowy</span>
                        </label>
                        <input type="text"
                            placeholder="Wprowadź kod pocztowy... (xx-xxx)" 
                            className="input input-bordered"
                            onChange={e => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                        <p className="text-slate-400 my-5 text-right">* jeżeli dotyczy</p> */}
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-56'>
                    <div className="stats shadow">
                        <div className="stat overflow-hidden">
                            <div className="stat-title">Łączna kwota:</div>
                            <div className="stat-value">
                                <ReactTextTransition springConfig={presets.wobbly}>{sum} PLN</ReactTextTransition>
                            </div>
                            <div className="stat-desc">za {amountOfItems} szt.</div>
                            <div className='stat-desc'>+ 15 zł wysyłka</div>
                        </div>
                    </div>
                    <button 
                        className='btn text-white hover:text-black bg-[#3d61aa] group'
                        onClick={handleCheckout}
                        >
                        {isSubmitted ? <span className="loading loading-spinner loading-xs"></span> : 'Przejdź do płatości'}
                        <GrNext className="group-hover:invert-0 invert"/>
                    </button>
                </div>
            </div>
            <div className='flex justify-center mx-5'>
                <ul className="steps">
                    <li className={`step ${cartState.length ? 'step-neutral' : ''}`}>Wybierz Produkty</li>
                    <li className="step">Płatność</li>
                    <li className="step">Przyjęcie Zamówienia</li>
                </ul>
            </div>
        </>
    )
}

export default Cart;