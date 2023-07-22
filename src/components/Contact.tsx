import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { AiOutlineFilePdf, AiOutlineMail } from 'react-icons/ai';

const url = await getDownloadURL(ref(storage, 'regulamin.pdf'));

const Contact: React.FC = () => {
    return (
        <>
            <h1 className="text-5xl text-center m-10">Kontakt</h1>
            <div className="flex flex-col justify-center items-center gap-10 my-40">
                <a href={url}><button className="btn">Regulamin Sklepu <AiOutlineFilePdf className="w-5 h-5"/></button></a>
                <p>Aby dokonać zwrotu <a className="underline" href="mailto:szkolka.marcin.fec@interia.pl">wyślij wiadomość</a>.</p>
                <a href='mailto:szkolka.marcin.fec@interia.pl'><button className="btn">Kontakt Mailowy<AiOutlineMail className="w-5 h-5"/></button></a>
            </div>        
        </>
    )
}

export default Contact;