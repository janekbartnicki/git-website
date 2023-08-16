import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct, clearCart, removeProduct } from '../store/slices/cartSlice';
import ReactTextTransition, { presets } from 'react-text-transition';
import { GrNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { fetchImages } from '../utils';

const images = await fetchImages('/images/main_images');

const Cart: React.FC = () => {
    const cartState = useSelector<RootState, CartProduct[]>(state => state.cart);
    const dispatch = useDispatch();
    let sum = 0;
    let amountOfItems = 0;

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
            <div className='flex md:lg:justify-end justify-center mx-48 my-5'>
                <button 
                    className='btn hover:text-black'
                    onClick={() => dispatch(clearCart())}    
                >
                    WYCZYŚĆ KOSZYK
                </button>
            </div>
            <div className="flex lg:md:justify-end justify-center lg:md:mx-40 lg:md:my-20">
                <div className='flex flex-col gap-5 w-56'>
                    <div className="stats shadow">
                        <div className="stat overflow-hidden">
                            <div className="stat-title">Łączna kwota:</div>
                            <div className="stat-value"><ReactTextTransition springConfig={presets.wobbly}>{sum} PLN</ReactTextTransition></div>
                            <div className="stat-desc">za {amountOfItems} szt.</div>
                        </div>
                    </div>
                    <button className='btn text-white hover:text-black bg-[#3d61aa] group'>
                        Przejdź do płatości
                        <GrNext className="group-hover:invert-0 invert"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cart;