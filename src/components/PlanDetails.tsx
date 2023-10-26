import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Plan, fetchImages, fetchPlans } from "../utils";
import { AiOutlineInfoCircle } from "react-icons/ai";

const PlanDetails: React.FC = () => {
    const {id} = useParams();

    const [plan, setPlan] = useState<Plan | null>(null)
    // const [loading, setLoading] = useState(true);
    // const [img, setImg] = useState<string | null>(null);

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

        // const fetchPlanPhoto = async () => {
        //     const result = await fetchImages('/images/plans/plan1.jpg');
        //     return result;
        // }

        // fetchPlanPhoto().then(result => {
        //     setImg(result as string);
        //     setLoading(false);
        // })

        fetchPlan(Number(id)).then(result => {
            setPlan(result);
        });
    }, [id]);

    // if(loading) return (
    //     <div className="flex w-full justify-center align-middle my-64">
    //         <span className="loading loading-spinner loading-lg h-full text-center"></span>
    //     </div>
    // )

    return (
        <>
            <div className="hero min-h-56 h-56" style={{backgroundImage: 'url(/images/background_plan1.png)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Plan Treningowy</h1>
                    </div>
                </div>
            </div>
            <div className="lg:md:w-[80%] mx-auto my-10">
                <div className="flex justify-around mx-10 flex-wrap">
                    <img src="https://sportplusopole.pl/wp-content/uploads/2020/07/sport-plus-light-version.svg" alt="Logo Sport Plus Opole" className="max-h-32"/>
                    <img src="/images/icon_logo.png" alt="Logo GiT Marcin Feć" className="max-h-32"/>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl my-10 font-bold">{plan?.name.toUpperCase()}</h1>
                </div>
                <div className="text-center lg:md:mx-40 mx-5 text-xl">
                    {plan?.longDesc}
                </div>
                <div className="text-center mt-10 mb-10">
                    <button className="btn text-xl w-32 h-14 bg-[#e83b3b] text-white hover:text-black ">
                        KUP {plan?.price}
                    </button>
                </div>
                <p className='flex justify-center mt-8 text-gray-400 mx-10'>
                        <span className='m-auto mx-2'><AiOutlineInfoCircle/></span>
                        Plan treningowy zostanie wysłany na podany przy zakupie adres e-mail.
                    </p>
            </div>
        </>
    )
}

export default PlanDetails;