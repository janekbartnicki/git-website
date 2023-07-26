import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const PasswordReset: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handlePasswordReset = async () => {
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
        } catch(error) {
            throw new Error();
        }
        
    }

    return(
        <>
            <h1 className="text-5xl text-center mt-10">Zresetuj hasło</h1>
            <div className="flex justify-center items-center my-24">
                <div className="form-control">
                    <label className="input-group flex justify-center">
                        <span>E-mail</span>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="email" className="input input-bordered" />
                    </label>
                    <p className="max-w-sm my-5 flex flex-col justify-center items-center text-center">
                        <AiOutlineInfoCircle className="w-8 h-8 mb-5"/>
                        Wprowadź adres e-mail na który założone było konto, a następnie sprawdź swoją skrzynkę.
                    </p>
                    <button onClick={handlePasswordReset} type="submit" className="btn my-10 bg-[#3d61aa] text-white hover:text-black">Zresetuj hasło</button>
                </div>
            </div>
        </>
    )
}

export default PasswordReset;