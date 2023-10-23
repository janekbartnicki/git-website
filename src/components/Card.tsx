import { Link } from 'react-router-dom';

interface CardProps {
    header: string;
    img: string;
    desc?: string;
    isNew?: boolean;
    link?: string;
    altImg: string;
    buttonPlaceholder?: string;
}

const Card: React.FC<CardProps> = ({header, img = 'images/icon_logo.png', desc, isNew, altImg, link = '#', buttonPlaceholder = 'WIĘCEJ'}) => {

    const renderBadge = (): JSX.Element | null => {
        if(isNew) {
            return <div className="badge bg-[#3d61aa] text-white">NOWOŚĆ</div>
        } else return null;
    }

    //TODO: przerobić wartości na wariat dla urządzeń mobilnych oraz poprawić responsywność oraz react-router
    return (
        <Link to={link} className="card w-80 bg-gray-100 m-auto mt-10 shadow-xl">
            <figure>
                <img draggable={false} className="max-h-60" src={img} alt={altImg} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {header}
                    {renderBadge()}
                </h2>
                <p className="text-gray-500 mb-5">{desc}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-[#e83b3b] text-white hover:text-black ">{buttonPlaceholder}</button>
                </div>
            </div>
        </Link>
    )
}

export default Card;