interface CardProps {
    header: string;
    img: string;
    desc?: string;
    price: string;
    isNew?: boolean;
}

const Card: React.FC<CardProps> = ({header, img, desc, price, isNew}) => {

    const renderBadge = (): JSX.Element | null => {
        if(isNew) {
            return <div className="badge bg-blue-700 text-white">NOWOŚĆ</div>
        } else return null;
    }

    //TODO: przerobić wartości na wariat dla urządzeń mobilnych oraz poprawić responsywność
    return (
        <div className="card w-80 bg-gray-100 m-auto mt-10 shadow-xl">
            <figure>
                <img draggable={false} className="max-h-60" src={img} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {header}
                    {renderBadge()}
                </h2>
                <p className="text-gray-500 mb-5">{desc}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-red-700 text-white hover:text-black">KUP {price} PLN</button>
                </div>
            </div>
        </div>
    )
}

export default Card;