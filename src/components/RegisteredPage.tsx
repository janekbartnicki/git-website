import { Link } from "react-router-dom";

const RegisteredPage: React.FC = () => {
    return (
        <div className="text-center flex flex-col items-center my-36 lg:md:my-44">
            {/* <img src="images/icon_logo.png" alt="Logo GiT" className="w-16 h-16" /> */}
            {/* <h1 className="text-4xl mt-10">Utworzono konto!</h1>
            <h2 className="text-xl mt-10">Nazwa użytkownika: {}</h2>
            <h2 className="text-xl">E-mail: {}</h2> */}
            <div className="alert alert-success w-80 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Pomyślnie utworzono konto!</span>
            </div>
            <div className="flex justify-center mt-20">
                <Link to='/' className="btn bg-[#3d61aa] text-white hover:text-black">Rozpocznij zakupy</Link>
            </div>
            <div className='z-10 sticky bottom-10 lg:md:px-48 px-5'>
                <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>!</span>
                </div>
            </div>
        </div>
    )
}

export default RegisteredPage;