import { useRouteError, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Error {
    status: number;
    statusText: string;
    data: string;
}

const ErrorBoundary: React.FC = () => {
    const error = useRouteError() as Error;
    console.error(error);

    return (
        <>
            <NavBar/>
                <h1 className="text-9xl text-center mt-10">Błąd</h1><br/><br/>
                <h2 className="text-3xl text-center">
                    Niestety nie znaleźliśmy strony której szukasz!
                </h2><br/>
                <h3 className="text-xl text-center">
                    Kod błędu: {error.status ? error.status : 'Nieznany'}<br/><br/>
                    {error.statusText ? error.statusText : 'Sprawdź poprawność adresu URL'}<br/>
                    {error.data ? error.data : null}
                </h3>
                <div className="flex justify-center mt-32">
                    <Link to='/' className="btn bg-[#3d61aa] text-white hover:text-black">Powrót na stronę główną</Link>
                </div>
            <Footer/>
        </>
    )
}

export default ErrorBoundary;