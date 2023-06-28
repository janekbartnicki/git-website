import { useEffect , useState} from 'react';
import { useParams } from "react-router";
import { Product, fetchProducts } from './utils';

const ProductDetails: React.FC = () => {
    const {id} = useParams();
    const [data, setData] = useState<Product | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchProducts();
            const product = response.find(product => product.id === Number(id));
            setData(product);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='w-56'>
                <div className="carousel w-56 m-20">
                    <div id="item1" className="carousel-item w-56 h-56">
                        <img src="/images/icon_logo.png" className="w-full" />
                    </div> 
                    <div id="item2" className="carousel-item  w-56 h-56">
                        <img src="/images/icon_logo.png" className="w-full" />
                    </div> 
                    <div id="item3" className="carousel-item w-56 h-56">
                        <img src="/images/icon_logo.png" className="w-full" />
                    </div> 
                    <div id="item4" className="carousel-item w-56 h-56">
                        <img src="/images/icon_logo.png" className="w-full" />
                    </div>
                    </div> 
                    <div className="flex justify-center w-full py-2 gap-2">
                    <a href="#item1" className="btn btn-xs">1</a> 
                    <a href="#item2" className="btn btn-xs">2</a> 
                    <a href="#item3" className="btn btn-xs">3</a> 
                    <a href="#item4" className="btn btn-xs">4</a>
                </div>
            </div>
            <div className='w-56'></div>
        </>
    )
}

export default ProductDetails;