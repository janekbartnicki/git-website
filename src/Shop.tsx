import { renderProductsCards, fetchProducts } from './utils';

// const response = await axios.get('/data/products.json');
// const products = Object.values(response.data.products) as Product[];
const products = await fetchProducts();

const Shop: React.FC = () => {

    return (
        <>
            <h1 className="text-bold text-center text-5xl mt-10">Sklep</h1>
            <div className='lg:m-20 lg:mt-5 flex flex-wrap gap-10'>
                {renderProductsCards(products)}
            </div>
        </>
    )
}

export default Shop;
