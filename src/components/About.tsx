import { fetchProducts, renderProductsCards } from "../utils";
import Banner from "./Banner";
import ShortAbout from "./ShortAbout";
const products = await fetchProducts();
const About: React.FC = () => {
    return (
        <>
            <Banner/>
            <ShortAbout/>
            <h1 className='text-center font-bold text-2xl mt-10'>Wybrane produkty</h1>
            <div className='lg:m-20 flex flex-wrap gap-10'>
                {renderProductsCards(products, 4)}
            </div>
        </>
    )
}

export default About;