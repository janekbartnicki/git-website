import './index.css';
import Home from './Home';
import Shop from './Shop';
import ProductDetails from './ProductDetails';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>} errorElement={<ErrorBoundary/>}>
        <Route index element={<Home/>}/>
        <Route path='/sklep' element={<Shop/>}/>
      </Route>
  )
)

const App = () => {
  return <RouterProvider router={router}/>
}

export default App;