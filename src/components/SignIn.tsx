import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { EmailError, handleEmailAuthError } from '../firebase/handleEmailAuthErrors';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { renderSuccess } from '../utils';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<{code: string; message: string} | undefined>()
    const [success, setSuccess] = useState<boolean>(false);
    const [buttonContent, setButtonContent] = useState<JSX.Element | string>('ZALOGUJ SIĘ');

    const submitBtnRef = useRef<HTMLButtonElement | null>(null);

    const dispatch = useDispatch();

    const renderButtonContent = (): void => {
        if (submitBtnRef.current) {
            setButtonContent(<span className="loading loading-spinner loading-sm"></span>);
            setTimeout(() => {
                setButtonContent(success ? 'ZALOGOWANO' : 'ZALOGUJ SIĘ');
            }, 1500);
        }
    }

    const renderError = (): JSX.Element | null => {
        if(!success) {
            return (
                <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
                    <div className="alert alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Uwaga: <b>{error?.code ? error?.code : 'Wystąpił błąd.'}</b> {error?.message}</span>
                    </div>
                </div>
            )
        } else return null;
    }

    const handleEmailSignIn = async () => {
        const auth = getAuth();
        
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            setSuccess(true);
            dispatch(setUser(user));
        } catch(error) {
            setError(handleEmailAuthError(error as EmailError));
        }
        
        
    }

    const renderCheck = (): JSX.Element => {
        return <div className='z-30 absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'><AiOutlineCheckCircle className="w-72 h-72 opacity-20"/></div>
    }

    return (
        <div className='transition transform'>
            {success ? renderCheck() : null}
            <div>
                <h1 className="text-5xl text-center my-10">Logowanie</h1>
                <div className="flex justify-center my-20">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Hasło</span>
                            </label>
                            <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="hasło" className="input input-bordered" />
                            <label className="label">
                                {/* TODO */}
                                <a href="#" className="label-text-alt link link-hover">Nie pamiętasz hasła?</a> 
                            </label>
                            </div>
                            <div className="form-control mt-6">
                                <button 
                                    className="btn text-white hover:text-black bg-[#3d61aa]" 
                                    onClick={() => {
                                        handleEmailSignIn();
                                        renderButtonContent();
                                    }}
                                    ref={submitBtnRef}>
                                        {buttonContent}
                                    </button>
                            </div>
                            <p className="text-center">lub</p>
                            <Link to='/rejestracja'>
                                <div className="form-control">
                                    <button className="btn text-white hover:text-black bg-[#e83b3b]">Załóż konto</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {error ? renderError() : null}
                {success ? renderSuccess('Pomyślnie zalogowano!') : null}
            </div>
        </div>
        
    )
}

export default SignIn;