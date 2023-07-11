import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth();

interface EmailError {
    code: string;
    message: string;
}

export const createEmailUser = async (email: string, password: string, username: string): Promise<User | EmailError | void> => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const {user} = userCredentials;
        
        await updateProfile(user, {
            displayName: username
        })
        
        console.log(userCredentials);
    } catch(e) {
        const error = e as EmailError;
        const errorCode = error.code;
        const errorMessage = error.message;

        switch(errorCode) {
            case 'auth/weak-password':
                return {
                    code: 'Za słabe hasło.',
                    message: 'Hasło powinno mieć co najmniej 6 znaków.'
                }
            case 'auth/invalid-email':
                return {
                    code: 'Niepoprawny e-mail.',
                    message: 'Sprawdź poprawność adresu e-mail.'
                }
            case 'auth/email-already-in-use':
                return {
                    code: 'Adres e-mail jest już w użyciu.',
                    message: 'Użyj innego adresu e-mail.'
                }
            default:
                return {
                    
                    code: errorCode,
                    message: errorMessage
                }
        }
    }
}

export const signUpEmailUser = async (email: string, password: string): Promise<User | EmailError | void> => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);
    } catch(e) {
        const error = e as EmailError;
        const errorCode = error.code;
        const errorMessage = error.message;

        switch(errorCode) {
            case 'auth/weak-password':
                return {
                    code: 'Za słabe hasło.',
                    message: 'Hasło powinno mieć co najmniej 6 znaków.'
                }
            case 'auth/invalid-email':
                return {
                    code: 'Niepoprawny e-mail.',
                    message: 'Sprawdź poprawność adresu e-mail.'
                }
            case 'auth/email-already-in-use':
                return {
                    code: 'Adres e-mail jest już w użyciu.',
                    message: 'Użyj innego adresu e-mail.'
                }
            default:
                return {
                    code: errorCode,
                    message: errorMessage
                }
        }
    }
}