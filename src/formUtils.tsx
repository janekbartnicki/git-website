import { AiOutlineCheckCircle } from "react-icons/ai"
import { GrPrevious } from "react-icons/gr"
import { Link } from "react-router-dom"
import { EmailError } from "./firebase/handleEmailAuthErrors"

export const renderCheck = (): JSX.Element => {
    return <div className='flex justify-center flex-col items-center'>
        <AiOutlineCheckCircle className="w-72 h-72 opacity-90"/>
        <Link to='/'>
                <button className='btn lg:md:w-64'>
                    <GrPrevious/>
                    <p>Strona Główna</p>
                </button>
        </Link>
    </div>
}

export const renderError = (success: boolean, error: EmailError | string): JSX.Element | null => {
    if(!success) {
        return (
            <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
                <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {(typeof error === 'string') ? 
                        <span>Uwaga: <b>{error}</b></span> :
                        <span>Uwaga: <b>{error?.code}</b> {error?.message}</span>
                    }
                </div>
            </div>
        )
    } else return null;
}

export const renderSuccess = (message: string): JSX.Element => {
    return (
        <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
            <div className="alert alert-success shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3>{message}</h3>
                <Link to='/'><button className="btn btn-sm">Przejdź do strony głównej</button></Link>
            </div>
        </div>
    )
}