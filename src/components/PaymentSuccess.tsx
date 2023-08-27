import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
    return (
        <div className="flex flex-col align-middle items-center justify-center mt-10 gap-10 mx-5">
            <img className="w-24 h-24" src="/images/icon_logo.png" alt="" />
            <h1 className="text-4xl max-w-lg text-center">Dziękujęmy za zakupy w naszym sklepie internetowym!</h1>
            <h3 className="text-2xl text-center">Operacja płatności zakończyła się sukcesem.</h3>
            <BsFillCartCheckFill className="w-24 h-24"/>
            <Link to='/'><button className="btn bg-[#3d61aa] text-white hover:text-black">Strona główna</button></Link>
            <div className='flex justify-center mx-5'>
                <ul className="steps">
                    <li className="step step-neutral">Wybierz Produkty</li>
                    <li className="step step-neutral">Płatność</li>
                    <li className="step step-neutral">Przyjęcie Zamówienia</li>
                </ul>
            </div>
        </div>
    )
}

export default PaymentSuccess;