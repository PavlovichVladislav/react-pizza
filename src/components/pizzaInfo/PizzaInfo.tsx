import { FC, useState, useEffect,  } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PizzaService from "../../services/PizzaService";

interface PizzaInterface {
    imageUrl: string,
    title: string,
    price: number
}

const PizzaInfo: FC = () => {
    
    const [pizza, setPizza] = useState<PizzaInterface>();
    const { id } = useParams();
    const pizzaService = new PizzaService();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await pizzaService.getPizza(id);
                setPizza(res);
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }

        fetchData();
    }, [id])

    if (!Object.keys(pizza).length) {
        return (
            <div>Загрузка....</div>
        )
    }

   return (
      <div>
         <img src={pizza.imageUrl} alt={pizza.title} />
         <h2>{pizza.title}</h2>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            consectetur itaque vero in illo, blanditiis voluptatum quam nihil
            architecto. Beatae itaque minima iure rerum quas quaerat unde dolore
            explicabo. Pariatur?
         </p>
         <span>Стоимость : {pizza.price} руб</span>
      </div>
   );
};

export default PizzaInfo;


