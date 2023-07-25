import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleEmailAuthError, EmailError } from '../firebase/handleEmailAuthErrors';
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { renderCheck, renderError, renderSuccess } from '../formUtils';
import { auth, firestore } from '../firebase';
import { collection, doc, setDoc } from "firebase/firestore";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<{code: string; message: string} | undefined>()
    const [success, setSuccess] = useState<boolean>(false);
    const [buttonContent, setButtonContent] = useState<JSX.Element | string>('ZAREJESTRUJ SIĘ');

    const submitBtnRef = useRef<HTMLButtonElement | null>(null);

    const dispatch = useDispatch();

    const renderButtonContent = (): void => {
        if (submitBtnRef.current) {
            setButtonContent(<span className="loading loading-spinner loading-sm"></span>);
            setTimeout(() => {
                setButtonContent('ZAREJESTRUJ SIĘ');
            }, 1500);
        }
    }
    
    const handleEmailSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if(password === confirmPassword && username && email) {

            try {
                const {user} = await createUserWithEmailAndPassword(auth, email, password);
                
                await updateProfile(user, {
                    displayName: username
                })

                const usersCollectionRef = collection(firestore, 'users');
                const userDocRef = doc(usersCollectionRef, user.uid);

                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })

                setSuccess(true);
                dispatch(setUser(user));
            } catch(error) {
                setError(handleEmailAuthError(error as EmailError));
            }
        } else if(!username) {
            setError({code: 'Brak nazwy użytkownika!', message: ''})
        }
    }

    const renderForm = (): JSX.Element => {
        return (
            <>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nazwa użytkownika</span>
                    </label>
                    <input type="text" required onChange={e => setUsername(e.target.value)} value={username} placeholder="nazwa użytkownika" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hasło</span>
                    </label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="hasło" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Powtórz hasło</span>
                    </label>
                    <input type="password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="powtórz hasło" className="input input-bordered mb-2" />
                    {
                        password !== confirmPassword ?
                            <div className="tooltip tooltip-open tooltip-error tooltip-bottom" data-tip="Hasła nie są takie same!"></div>
                            : null
                    }
                </div>
                <div className="form-control mt-10">
                            <button 
                                className="btn text-white hover:text-black bg-[#3d61aa]" 
                                type='submit' 
                                ref={submitBtnRef}
                                onClick={e => {
                                    handleEmailSignUp(e);
                                    renderButtonContent();
                                }}>
                                    {buttonContent}
                            </button>
                        </div>
                        <p className="text-center">lub</p>
                        <Link to='/logowanie'>
                            <div className="form-control">
                                <button className="btn text-black">Powrót</button>
                            </div>
                        </Link>
            </>
        )
    }

    return (
        <div>
            <h1 className="text-5xl text-center my-10">Rejestracja</h1>
            <div className="flex justify-center my-20">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {success ? renderCheck() : renderForm()}
                    </div>
                </div>
            </div>
            {error ? renderError(success, error) : null}
            {success ? renderSuccess('Pomyślnie założono konto!') : null}
        </div>
    );
}

export default SignUp;