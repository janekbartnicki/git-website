import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { User, getAuth, signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { unsetUser } from "../store/slices/userSlice";
import { renderError, renderSuccess } from "../formUtils";
import { getUser } from "../utils";
import { MdOutlineAdminPanelSettings} from 'react-icons/md';
import { Link } from "react-router-dom";

const UserAccount: React.FC = () => {
    const {displayName, email, photoURL, uid} = useSelector<RootState, Partial<User>>(state => state.user);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchAdmin = async () => {
            if(uid) {
                const {isAdmin} = await getUser(uid);
                isAdmin ? setIsAdmin(true) : setIsAdmin(false);
            }
        }

        fetchAdmin();
        
    }, [uid])

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

    return (
        <>
            <div className="flex justify-center items-center flex-col gap-5 mt-16 mb-24">
                {
                    photoURL ? <img src={photoURL} alt="zdjęcie profilowe" className="w-72 h-72 mask mask-circle"/> :
                    <AiOutlineUser className="w-72 h-72 mask mask-circle bg-slate-100"/>
                }
                <h1 className="text-4xl">{displayName}</h1>
                <h2 className="text-2xl lg:md:mx-0 mx-5 text-center mb-5">E-mail: <b>{email}</b></h2>
                {
                    isAdmin ? 
                        <Link to='/konto/admin/admin_panel'>
                            <button className="btn">
                                Panel Administracyjny <MdOutlineAdminPanelSettings className="w-5 h-5"/>
                            </button>
                        </Link> : null
                }
                
                
                <button className="btn" onClick={handleLogOut}><BiLogOut className="w-5 h-5"/>
                    {displayName ? 'Wyloguj się' : <span className="loading loading-spinner mx-20 loading-sm"></span>}
                </button>
            </div>
            {error ? renderError(success, 'Wystąpił błąd! Wylogowywanie nie powiodło sie.') : null}
            {success ? renderSuccess('Nastąpiło wylogowanie.') : null}
        </>
    )
}

export default UserAccount;