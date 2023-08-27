import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { AiOutlineFilePdf, AiOutlineMail } from 'react-icons/ai';
import { TiSocialInstagram } from "react-icons/ti";
import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Contact: React.FC = () => {
    const [rulesPdfUrl, setRulesPdfUrl] = useState<string>('');
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        const fetchPdf = async (): Promise<void> => {
            try {
                const url = await getDownloadURL(ref(storage, 'regulamin.pdf'));
                setRulesPdfUrl(url);
            } catch(error) {
                console.error(error);
            }
        }

        fetchPdf();
    }, [])

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    }

    const handlePreviousPage = () => {
        if(pageNumber - 1 > 0) {
            setPageNumber(pageNumber - 1);
        }
    }

    const handleNextPage = () => {
        if(numPages) {
            if(pageNumber + 1 <= numPages) {
                setPageNumber(pageNumber + 1);
            }
        }
    }

    return (
        <>
            <h1 className="text-5xl text-center mt-10">Kontakt</h1>
            <div className="flex justify-center flex-wrap items-center gap-10 mt-16 mb-10">
                <a href={rulesPdfUrl}><button className="btn">Regulamin Sklepu <AiOutlineFilePdf className="w-5 h-5"/></button></a>
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
            <div className="flex flex-row justify-center align-middle">
                <div className="overflow-x-auto">
                    {rulesPdfUrl ? 
                        <Document file={rulesPdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} className='mb-0'/>
                            <p className="text-center">Strona {pageNumber} z {numPages}</p>
                            <div className="flex justify-center gap-10 m-5">
                                <button onClick={handlePreviousPage} className="btn">Poprzednia</button>
                                <button onClick={handleNextPage} className="btn">Następna</button>
                            </div>
                        </Document> :
                        <span className="loading loading-spinner loading-md my-10"></span>
                    }
                </div>
            </div>
        </>
    )
}

export default Contact;