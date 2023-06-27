import { useRouteError, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ErrorBoundary: React.FC = () => {
    const error = useRouteError();
    console.log(error)
    return (
        <>
            <NavBar/>
                <h1 className="text-9xl text-center mt-10">404</h1><br/><br/>
                <h2 className="text-3xl text-center">
                    Niestety nie znaleźliśmy strony której szukasz!
                </h2><br/>
                <h3 className="text-xl text-center">
                    Kod błędu: 404<br/><br/>
                    Sprawdź poprawność adresu URL
                </h3>
                <div className="flex justify-center mt-32">
                    <Link to='/' className="btn bg-[#3d61aa] text-white hover:text-black">Powrót na stronę główną</Link>
                </div>
            <Footer/>
        </>
    )
}

export default ErrorBoundary;