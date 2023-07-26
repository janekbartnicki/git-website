import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { EmailError, handleEmailAuthError } from '../firebase/handleEmailAuthErrors';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { renderCheck, renderError, renderSuccess } from '../formUtils';
import { FcGoogle } from 'react-icons/fc';
import { auth, firestore, googleProvider } from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

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

    const handleGoogleSignIn = async () => {
        try {
            const {user} = await signInWithPopup(auth, googleProvider);

            const usersCollectionRef = collection(firestore, 'users');
            const userDocRef = doc(usersCollectionRef, user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            
            if(!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            }

            setSuccess(true);
            dispatch(setUser(user));
        } catch(error) {
            setError(handleEmailAuthError(error as EmailError));
        }
    }

    const handleEmailSignIn = async () => {   
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            setSuccess(true);
            dispatch(setUser(user));
        } catch(error) {
            setError(handleEmailAuthError(error as EmailError));
        }   
    }

    const renderForm = (): JSX.Element => {
        return(
            <>
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
                        <Link to="/reset" className="label-text-alt link link-hover">Nie pamiętasz hasła?</Link> 
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
                    <button className='btn' onClick={handleGoogleSignIn}>
                        <FcGoogle className="w-5 h-5"/>Zaloguj się z Google
                    </button>
                    <p className="text-center">lub</p>
                    <Link to='/rejestracja'>
                        <div className="form-control">
                            <button className="btn text-white hover:text-black bg-[#e83b3b]">Załóż konto</button>
                        </div>
                    </Link>
            </>
        )
    }

    return (
        <div className='transition transform'>
            <div>
                <h1 className="text-5xl text-center my-10">Logowanie</h1>
                <div className="flex justify-center my-20">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            {success ? renderCheck() : renderForm()}
                        </div>
                    </div>
                </div>
                {error ? renderError(success, error) : null}
                {success ? renderSuccess('Pomyślnie zalogowano!') : null}
            </div>
        </div>
        
    )
}

export default SignIn;