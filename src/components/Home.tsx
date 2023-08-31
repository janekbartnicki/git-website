import ShortAbout from './ShortAbout';
import { renderProductsCards, fetchProducts } from '../utils';
import Banner from './Banner';
import { Link } from 'react-router-dom';
import { GrNext } from 'react-icons/gr';

// const response = await axios.get('/data/products.json');
// const products = Object.values(response.data.products) as Product[];



const products = await fetchProducts();
// const photos = await fetchImages();

const Home: React.FC = () => {
    return (
        <>
            <div className='hidden xl:lg:md:sm:block'>
                <Banner/>
            </div>
            <ShortAbout/>
            <h1 className='text-center my-0 text-4xl'>Wybrane produkty</h1>
            <div className='lg:m-20 my-10 flex flex-wrap gap-10'>
                {renderProductsCards(products, 4)}
            </div>
            <div className='flex justify-center my-24'>
                <Link to='/sklep'>
                    <button className='btn bg-[#3d61aa] lg:md:w-64 text-white group'>
                        <p className='group-hover:text-black'>Przejdź do Sklepu</p>
                        <GrNext className="group-hover:invert-0 invert"/>
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Home;