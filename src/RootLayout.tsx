import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { CartProduct } from './store/slices/cartSlice';

const RootLayout: React.FC = () => {
    const cartState = useSelector<RootState, CartProduct[]>(state => state.cart);
    let amountOfProducts = 0;

    cartState.forEach(products => {
        amountOfProducts += products.quantity;
    })

    console.log(amountOfProducts);

    return (
        <>
            <NavBar cartCount={amountOfProducts}/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default RootLayout;