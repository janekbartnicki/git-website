import './index.css';
import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import About from './components/About';
import store from './store';
import { Provider } from 'react-redux';
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

const App = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);  

  onAuthStateChanged(auth, async user => {
    if(user?.uid) {
      const {isAdmin} = await getUser(user.uid);
      isAdmin ? setIsAdmin(true) : setIsAdmin(false);
    }
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>} errorElement={<ErrorBoundary/>}>
        <Route index element={<Home/>}/>
        <Route path='/sklep' element={<Shop/>}/>
        <Route path='/sklep/produkt/:id' element={<ProductDetails/>}/>
        <Route path='/koszyk' element={<Cart/>}/>
        <Route path='/o_nas' element={<About/>}/>
        <Route path='/logowanie' element={<SignIn/>}/>
        <Route path='/rejestracja' element={<SignUp/>}/>
        <Route path='/zarejestrowano' element={<RegisteredPage/>}/>
        <Route path='/konto' element={<UserAccount/>}/>
        <Route path='/reset' element={<PasswordReset/>}/>
        <Route path='/kontakt' element={<Contact/>}/>
        {/* { isAdmin ? <Route path='/konto/admin/admin_panel' element={<AdminPanel/>}/> : null } */}
        <Route path='/konto/admin/admin_panel' element={<AdminPanel/>}/>
      </Route>
    )
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App;