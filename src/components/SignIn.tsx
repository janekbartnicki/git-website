import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

const LogInPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const auth = getAuth();

    console.log(email, password)
    return (
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
                            <a href="#" className="label-text-alt link link-hover">Nie pamiętasz hasła?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn text-white hover:text-black bg-[#3d61aa]">Zaloguj się</button>
                        </div>
                        <p className="text-center">lub</p>
                        <div className="form-control">
                            <button className="btn text-white hover:text-black bg-[#e83b3b]">Załóż konto</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;