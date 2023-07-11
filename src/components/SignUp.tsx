import { useState } from 'react';
import { createEmailUser } from '../firebase/emailUsers';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    const handleEmailSignUp = () => {
        if(password === confirmPassword) {
            console.log(createEmailUser(email, password, username));
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
                            <button className="btn text-white hover:text-black bg-[#3d61aa]" onClick={handleEmailSignUp}>Zarejestruj się</button>
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
        </div>
    );
}

export default SignUp;