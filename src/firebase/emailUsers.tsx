// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
// import { redirect } from "react-router-dom";

// const auth = getAuth();

// interface EmailError {
//     code: string;
//     message: string;
// }a

// export const createEmailUser = async (email: string, password: string, username: string): Promise<EmailError | void> => {
//     try {
//         const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//         const {user} = userCredentials;
        
//         await updateProfile(user, {
//             displayName: username
//         })
        
//         console.log(userCredentials);


//     } catch(e) {
//         const error = e as EmailError;
//         const errorCode = error.code;
//         const errorMessage = error.message;

//         switch(errorCode) {
//             case 'auth/weak-password':
//                 return {
//                     code: 'Za słabe hasło.',
//                     message: 'Hasło powinno mieć co najmniej 6 znaków.'
//                 }
//             case 'auth/invalid-email':
//                 return {
//                     code: 'Niepoprawny e-mail.',
//                     message: 'Sprawdź poprawność adresu e-mail.'
//                 }
//             case 'auth/email-already-in-use':
//                 return {
//                     code: 'Adres e-mail jest już w użyciu.',
//                     message: 'Użyj innego adresu e-mail.'
//                 }
//             default:
//                 return {
                    
//                     code: errorCode,
//                     message: errorMessage
//                 }
//         }
//     }
// }

// export const signInEmailUser = async (email: string, password: string): Promise<EmailError | void> => {
//     try {
//         const userCredentials = await signInWithEmailAndPassword(auth, email, password);
//         console.log(userCredentials)

//     } catch(e) {
//         const error = e as EmailError;
//         const errorCode = error.code;
//         const errorMessage = error.message;

//         console.log(error.code)
        
//         switch(errorCode) {
//             case 'auth/wrong-password':
//                 return {
//                     code: 'Niepoprawne hasło.',
//                     message: 'Sprawdź poprawność hasła.'
//                 }
//             case 'auth/invalid-email':
//                 return {
//                     code: 'Niepoprawny e-mail.',
//                     message: 'Sprawdź poprawność adresu e-mail.'
//                 }
//             case 'auth/user-not-found':
//                 return {
//                     code: 'Nie znaleziono użytkownika o podanym adresie e-mail.',
//                     message: 'Sprawdź poprawność adresu e-mail.'
//                 }
//             default:
//                 return {
//                     code: errorCode,
//                     message: errorMessage
//                 }
//         }
//     }
// }