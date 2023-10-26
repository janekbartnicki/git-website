import { fetchImages, fetchPlans, Plan } from "../utils";
import Card from "./Card";

const mainImgUrl = await fetchImages('/images/odra2.jpg') as string;
const plans = await fetchPlans();

const renderPlanCards = (plans: Plan[]): JSX.Element[] => {
    const plansArray: JSX.Element[] = [];

    for(const {id, shortDesc, name, price} of plans) {
        plansArray.push(
            <Card 
                key={id} 
                buttonPlaceholder={`CENA ${price} ZŁ`}
                header={name}
                desc={shortDesc}
                img={mainImgUrl}
                altImg="Plan treningowy"
                link={`/plany/${id}`}
            />
        )
    }

    return plansArray;
}

const Plans: React.FC = () => {


    return (
        <>
            <h1 className="text-center text-5xl mt-10">Plany Treningowe</h1>
            {renderPlanCards(plans)}

        </>
    )
}

export default Plans;