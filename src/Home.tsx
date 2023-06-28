import axios from 'axios';
import ShortAbout from './ShortAbout';
import { renderProductsCards, fetchProducts } from './utils';

// const response = await axios.get('/data/products.json');
// const products = Object.values(response.data.products) as Product[];



const products = await fetchProducts();

const Home: React.FC = () => {
    return (
        <>
            
            <ShortAbout/>
            <h1 className='text-center font-bold text-2xl'>Wybrane produkty</h1>
            <div className='lg:m-20 flex flex-wrap gap-10'>
                {renderProductsCards(products, 4)}
            </div>
            
        </>
    )
}

export default Home;