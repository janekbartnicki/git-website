import { useEffect , useState} from 'react';
import { useParams } from "react-router";
import { Product, fetchProducts } from './utils';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { GrPrevious, GrNext } from 'react-icons/gr';


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
        <div className='flex flex-row flex-wrap justify-center justify-items-center justify-self-center mt-10'>
            <div className='w-[40rem] min-w-50'>
                <CarouselProvider
                    naturalSlideWidth={24}
                    naturalSlideHeight={24}
                    totalSlides={3}
                >
                    <Slider className='mx-5 my-2 rounded-lg'>
                        <Slide index={0}><img className='w-auto h-auto m-auto' src="/images/icon_logo.png" alt="" /></Slide>
                        <Slide index={1}><img className='w-auto h-auto m-auto' src="/images/icon_logo.png" alt="" /></Slide>
                        <Slide index={2}><img className='w-auto h-auto m-auto' src="/images/icon_logo.png" alt="" /></Slide>
                    </Slider>
                    <div className='flex justify-center'>
                        <ButtonBack>
                            <GrPrevious className="w-10 h-10 m-5"/>
                        </ButtonBack>
                        <ButtonNext>
                            <GrNext className="w-10 h-10 m-5"/>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
            <div className='w-[40rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi minima officia optio labore ratione consectetur quo, alias, dignissimos quaerat accusamus a porro, aspernatur illum at aperiam fuga ipsa cum maxime?</div>
        </div>
    )
}

export default ProductDetails;