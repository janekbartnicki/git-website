import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleEmailAuthError, EmailError } from '../firebase/handleEmailAuthErrors';
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<{code: string; message: string} | undefined>()
    const [success, setSuccess] = useState<boolean>(false);

    const dispatch = useDispatch();

    const renderError = (): JSX.Element | null => {
        if(!success) {
            return (
                <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
                    <div className="alert alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Uwaga: <b>{error?.code}</b> {error?.message}</span>
                    </div>
                </div>
            )
        } else return null;
    }

    const renderSuccess = (): JSX.Element => {
        return (
            <div className='z-10 sticky bottom-10 lg:md:px-80 px-5 transition'>
                <div className="alert alert-success shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3>Pomyślnie utworzono konto!</h3>
                    <Link to='/'><button className="btn btn-sm">Przejdź do strony głównej</button></Link>
                </div>
            </div>
        )
    }
    
    const handleEmailSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if(password === confirmPassword && username && email) {
            const auth = getAuth();

            try {
                const {user} = await createUserWithEmailAndPassword(auth, email, password);
                
                await updateProfile(user, {
                    displayName: username
                })
                setSuccess(true);
                dispatch(setUser(user));
            } catch(error) {
                setError(handleEmailAuthError(error as EmailError));
            }
        }
    }

    return (
        <div>
            <h1 className="text-5xl text-center my-10">Rejestracja</h1>
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
                                <span className="label-text">Nazwa użytkownika</span>
                            </label>
                            <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="nazwa użytkownika" className="input input-bordered" />
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
                                onClick={e => handleEmailSignUp(e)}>
                                    Zarejestruj się
                            </button>
                        </div>
                        <p className="text-center">lub</p>
                        <Link to='/logowanie'>
                            <div className="form-control">
                                <button className="btn text-black">Powrót</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {error ? renderError() : null}
            {success ? renderSuccess() : null}
            {/* {renderSuccess()} */}
        </div>
    );
}

export default SignUp;