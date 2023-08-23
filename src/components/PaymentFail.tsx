import { Link } from "react-router-dom";
import { BsCartXFill } from 'react-icons/bs';

const PaymentFail: React.FC = () => {
    return (
        <div className="flex flex-col align-middle items-center justify-center mt-10 gap-10 mx-5">
            <BsCartXFill className="w-24 h-24"/>
            <h1 className="text-4xl max-w-lg text-center">Coś poszło nie tak!</h1>
            <h3 className="text-2xl text-center">Transakcja płatności zakończyła się niepowodzeniem.</h3>
            <Link to='/'><button className="btn bg-[#3d61aa] text-white hover:text-black">Strona główna</button></Link>
        </div>
    )
}

export default PaymentFail;