export interface EmailError {
    code: string;
    message: string;
}

export const handleEmailAuthError = (error: EmailError) => {
    switch(error.code) {
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
        case 'auth/wrong-password':
            return {
                code: 'Niepoprawne hasło.',
                message: 'Sprawdź poprawność hasła.'
            }
        case 'auth/user-not-found':
            return {
                code: 'Nie znaleziono użytkownika o podanym adresie e-mail.',
                message: 'Sprawdź poprawność adresu e-mail.'
            }
        case 'auth/missing-password':
            return {
                code: 'Nie wprowadzono hasła.',
                message: 'Proszę wprowadzić hasło.'
            }
        default:
            return {
                
                code: error.code,
                message: error.message
            }
    }
}