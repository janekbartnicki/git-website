import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { AiOutlineFilePdf, AiOutlineMail } from 'react-icons/ai';
import { TiSocialInstagram } from "react-icons/ti";
import { useEffect, useState } from "react";

const Contact: React.FC = () => {
    const [rulesPdfUrl, setRulesPdfUrl] = useState<string>('');
    const [rodoPdfUrl, setRodoPdfUrl] = useState<string>('');

    useEffect(() => {
        const fetchPdf = async (): Promise<void> => {
            try {
                const rulesPdf = await getDownloadURL(ref(storage, 'regulamin.pdf'));
                setRulesPdfUrl(rulesPdf);

                const rodoPdf = await getDownloadURL(ref(storage, 'polityka_prywatnosci.pdf'));
                setRodoPdfUrl(rodoPdf);
            } catch(error) {
                console.error(error);
            }
        }

        fetchPdf();
    }, [])

    return (
        <>
            <h1 className="text-5xl text-center mt-10">Kontakt</h1>
            <div className="flex justify-center flex-wrap items-center gap-10 mt-16 mb-10">
                <a href='mailto:szkolka.marcin.fec@interia.pl'><button className="btn">Kontakt Mailowy<AiOutlineMail className="w-5 h-5"/></button></a>
            </div>
            <p className="text-center mb-10">Aby dokonać zwrotu <a className="underline" href="mailto:szkolka.marcin.fec@interia.pl">wyślij wiadomość</a>.</p>    
            <div className="flex justify-center">
                <div className="grid grid-flow-col gap-4 max-w-xl">
                <a href='https://www.instagram.com/git.goalkeeper.gloves/'>
                    <TiSocialInstagram className="w-7 h-7"/>
                </a> 
                <a href='https://youtube.com/@goalkeeperindividualtraininggk'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
                <a href='https://www.facebook.com/SzkolkaBramkarskaMFec'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                </div>
            </div>
            <h1 className="text-5xl text-center mt-10">Regulamin</h1>
            <div className="flex justify-center flex-wrap items-center gap-10 mt-16 mb-10">
                <a href={rulesPdfUrl}><button className="btn">Regulamin Sklepu <AiOutlineFilePdf className="w-5 h-5"/></button></a>
            </div>
            <h1 className="text-5xl text-center mt-10">Polityka Prywatności</h1>
            <div className="flex justify-center flex-wrap items-center gap-10 mt-16 mb-10">
                <a href={rodoPdfUrl}><button className="btn">Polityka Prywatności <AiOutlineFilePdf className="w-5 h-5"/></button></a>
            </div>
            
        </>
    )
}

export default Contact;