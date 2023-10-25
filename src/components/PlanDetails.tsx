import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Plan, fetchImages, fetchPlans } from "../utils";

const PlanDetails: React.FC = () => {
    const {id} = useParams();

    const [plan, setPlan] = useState<Plan | null>(null)
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlan = async (id: number): Promise<Plan> => {
            try {
                const result = await fetchPlans(id);
                return result[0];
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        const fetchPlanPhoto = async () => {
            const result = await fetchImages('/images/plans/plan1.jpg');
            return result[0];
        }

        fetchPlanPhoto().then(result => {
            setImg(result as string);
            setLoading(false);
        })

        fetchPlan(Number(id)).then(result => {
            setPlan(result);
        });
    }, [id]);

    if(loading) return (
        <div className="flex w-full justify-center align-middle my-64">
            <span className="loading loading-spinner loading-lg h-full text-center"></span>
        </div>
    )

    return <h1>{id}</h1>
}

export default PlanDetails;