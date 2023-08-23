import './index.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RegisteredPage from './components/RegisteredPage';
import UserAccount from './components/UserAccount';
import PasswordReset from './components/PasswordReset';
import Contact from './components/Contact';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUser } from './utils';
import AdminPanel from './components/AdminPanel';
import { fetchProductsData } from './store/slices/productsSlice';
import Loading from './components/Loading';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFail from './components/PaymentFail';

const App = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [])

  useEffect(() => {
    dispatch(fetchProductsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  onAuthStateChanged(auth, async user => {
    if(user?.uid) {
      const userDoc = await getUser(user.uid);
      const isAdmin = userDoc && userDoc.isAdmin === true;
      setIsAdmin(isAdmin);
    }
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>} errorElement={<ErrorBoundary/>}>
        <Route index element={<Home/>}/>
        <Route path='/sklep' element={<Shop/>}/>
        <Route path='/sklep/produkt/:id' element={<ProductDetails/>}/>
        <Route path='/koszyk' element={<Cart/>}/>
        <Route path='/logowanie' element={<SignIn/>}/>
        <Route path='/rejestracja' element={<SignUp/>}/>
        <Route path='/zarejestrowano' element={<RegisteredPage/>}/>
        <Route path='/konto' element={<UserAccount/>}/>
        <Route path='/reset' element={<PasswordReset/>}/>
        <Route path='/kontakt' element={<Contact/>}/>
        <Route path='/platnosc/sukces' element={<PaymentSuccess/>}/>
        <Route path='/platnosc/niepowodzenie' element={<PaymentFail/>}/>
        { isAdmin ? <Route path='/konto/admin/admin_panel' element={<AdminPanel/>}/> : null }
      </Route>
    )
  )

  return loading ? <Loading/> : <RouterProvider router={router}/>;
}

export default App;