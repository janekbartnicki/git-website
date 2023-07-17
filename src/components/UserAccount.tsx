import { AiOutlineCheckCircle, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { User, getAuth, signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { useState } from 'react';
import { unsetUser } from "../store/slices/userSlice";
import { renderSuccess } from "../utils";

const UserAccount: React.FC = () => {
    const {displayName, email} = useSelector<RootState, Partial<User>>(state => state.user);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleLogOut = async () => {
        const auth = getAuth();
        
        try {
            await signOut(auth);
            dispatch(unsetUser());
            setSuccess(true);
        } catch(error) {
            setError(true);
        }
    }

    const renderError = (): JSX.Element => {
        return (
            <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
                <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Uwaga: <b>Wystąpił błąd! Wylogowywanie nie powiodło sie.</b></span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col gap-5 mt-16 mb-24">
                <AiOutlineUser className="w-72 h-72 mask mask-circle bg-slate-100"/>
                <h1 className="text-4xl">{displayName}</h1>
                <h2 className="text-2xl">E-mail: <b>{email}</b></h2>
                <button className="btn" onClick={handleLogOut}><BiLogOut className="w-5 h-5"/>
                    {displayName ? 'Wyloguj się' : <span className="loading loading-spinner mx-20 loading-sm"></span>}
                </button>
            </div>
            {error ? renderError() : null}
            {success ? renderSuccess('Nastąpiło wylogowanie.') : null}
        </>
    )
}

export default UserAccount;