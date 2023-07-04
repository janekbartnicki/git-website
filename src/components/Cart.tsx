import { SiAllegro } from 'react-icons/si';

const Cart: React.FC = () => {
    return (
        <>
            <h1 className="font-bold text-center text-5xl my-16">Twój koszyk</h1>
            <div className="overflow-x-auto my-20 lg:md:mx-44 sm:mx-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nazwa</th>
                            <th>Rozmiar</th>
                            <th>Cena</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td className='flex justify-start'><img className='w-8 h-8 m-5' src='/images/icon_logo.png'/><p className='m-5'>nazwa1</p></td>
                        <td>7</td>
                        <td>170 zł</td>
                        <td className='w-20'><button className='btn bg-red-700 text-white w-15 h-10 m-1 hover:text-black'>USUŃ</button></td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td className='flex justify-start'><img className='w-8 h-8 m-5' src='/images/icon_logo.png'/><p className='m-5'>nazwa1</p></td>
                        <td>8</td>
                        <td>170 zł</td>
                        <td className='w-20'><button className='btn bg-red-700 text-white w-15 h-10 m-1 hover:text-black'>USUŃ</button></td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td className='flex justify-start'><img className='w-8 h-8 m-5' src='/images/icon_logo.png'/><p className='m-5'>nazwa1</p></td>
                        <td>9</td>
                        <td>170 zł</td>
                        <td className='w-20'><button className='btn bg-red-700 text-white w-15 h-10 m-1 hover:text-black'>USUŃ</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-around">
                <div className='text-3xl'>
                    Suma: 0 zł
                </div>
                <button className='btn bg-orange-600 text-white hover:text-black '>Przejdź do płatości z <SiAllegro className="w-12 h-12"/></button>
            </div>
        </>
    )
}

export default Cart;