import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import ErrorBoundary from './ErrorBoundary';
import Home from './Home';
import Shop from './Shop';
import ProductDetails from './ProductDetails';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>} errorElement={<ErrorBoundary/>}>
        <Route index element={<Home/>}/>
        <Route path='/sklep' element={<Shop/>}/>
        <Route path='/sklep/produkt/:id' element={<ProductDetails/>}/>
      </Route>
  )
)

const App = () => {
  return <RouterProvider router={router}/>
}

export default App;