import './index.css';
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

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>} errorElement={<ErrorBoundary/>}>
        <Route index element={<Home/>}/>
        <Route path='/sklep' element={<Shop/>}/>
        <Route path='/sklep/produkt/:id' element={<ProductDetails/>}/>
        <Route path='/koszyk' element={<Cart/>}/>
        <Route path='/o_nas' element={<About/>}/>
      </Route>
  )
)

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App;