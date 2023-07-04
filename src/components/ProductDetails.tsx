import { useEffect , useState} from 'react';
import { useParams} from "react-router";
import { Link  } from 'react-router-dom';
import { Product, fetchProducts } from '../utils';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { IoMdArrowDropdown } from 'react-icons/io';
import { HiOutlineShoppingCart } from 'react-icons/hi';


const ProductDetails: React.FC = () => {
    const {id} = useParams();
    const [data, setData] = useState<Product | undefined>();
    const [price, setPrice] = useState<number | undefined>(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchProducts();
            const product = response.find(product => product.id === Number(id));
            setData(product);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(selectedSize && selectedSize >= 8) {
            setPrice(data?.price[1]);
        } else if(selectedSize) {
            setPrice(data?.price[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSize])

    const renderCut = (): JSX.Element | null => {
        if(data?.spec.cut){
            return <li><b>&emsp;Cięcie: </b>{data?.spec.cut}</li>;
        } else return null;
    }

    const renderSize = (): JSX.Element[] | null => {
        if(!data) return null;

        return data?.spec.sizes.map(size => {
            return <li key={size} className='hover:bg-gray-200 rounded-lg text-center cursor-pointer' onClick={() => setSelectedSize(size)}>{size}</li>
        })
    }

    const renderTableContent = (): JSX.Element => {
        const sizes = data?.spec.sizes;
        const small: number[] = [];
        const large: number[] = [];

        sizes?.forEach((size): void => {
            if(size < 8) {
                small.push(size);
            } else large.push(size);
        })

        return (
            <>
                {
                    small.length != 0 ?
                        <tr>
                            <td>{small.join(', ')}</td>
                            <td>{data?.price[0]} zł</td>
                        </tr>
                    : null
                }
                {
                    large.length != 0 ?
                        <tr>
                            <td>{large.join(', ')}</td>
                            <td>{data?.price[1]} zł</td>
                        </tr>
                    : null
                }
            </>
        )
    }

    renderTableContent();

    const selectSize = (): number | string => selectedSize ? selectedSize : '-';

    return (
        <>
            <div className='flex justify-left m-5'>
                <Link to='/sklep'>
                    <button className='btn bg-[#3d61aa] lg:md:w-64 text-white group'>
                        <GrPrevious className="group-hover:invert-0 invert"/>
                        <p className='group-hover:text-black'>Powrót</p>
                    </button>
                </Link>
            </div>
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
                <div className='w-[40rem] m-5 flex flex-col'>
                    <div>
                        <h1 className='text-5xl'>{data?.name}</h1><br/>
                        <h2 className='text-3xl'>{data?.model}</h2><br/><br/>
                        <h3 className='text-xl'>Specyfikacja: </h3><br/>
                        <ul className='text-lg'>
                            {renderCut()}
                            <li>&emsp;<b>Pianka:</b> {data?.spec.foam}</li>
                            <li>&emsp;<b>Lateks:</b> {data?.spec.latex}</li>
                        </ul>
                    </div>
                    <p className='flex justify-end lg:md:mx-40 text-5xl text-[#3d61aa]'><b>{price ? `${price} zł` : '- zł'}</b></p>
                    <p className='flex justify-end lg:md:mx-40 text-md'>Wybrany rozmiar: {selectSize()}</p>
                    <div className='flex my-14 flex-wrap justify-center lg:md:justify-start'>
                        <div className="dropdown my-5">
                            <label tabIndex={0} className="btn m-1">Wybierz Rozmiar<IoMdArrowDropdown/></label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-20">
                                {renderSize()}
                            </ul>
                        </div>
                        <button className='btn my-5 bg-[#e83b3b] text-white mx-16  w-40 text-md hover:text-black'>
                            DO KOSZYKA
                            <HiOutlineShoppingCart className="w-5 h-5"/>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Rozmiary</th>
                                <th>Cena</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderTableContent()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;