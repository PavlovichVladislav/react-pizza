import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./SignUpModal.module.scss";
import { setNewProducActive } from "../../redux/modals/slice";
import { RootState } from "../../redux/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PizzaService from "../../services/PizzaService";

export type Pizza = {
   price: string;
   title: string;
   sizes: string[];
   imageUrl: string;
   calories: string;
   weight: string;
   types: string[];
   rating: string;
};

const NewProducModal: FC = () => {
   const newProducActive = useSelector(
      (state: RootState) => state.modals.newProducActive
   );
   const dispatch = useDispatch();

   if (newProducActive) {
      return (
         <div className={s.modal}>
            <div className={s.modalContent}>
               <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={s.modalClose}
                  onClick={() => dispatch(setNewProducActive())}
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                     fill="white"
                  ></path>
               </svg>
               <Basic />
            </div>
         </div>
      );
   } else {
      return null;
   }
};

const Basic: FC = () => (
   <div>
      <h2>Добавление нового товара</h2>
      <Formik
         initialValues={{
            price: "",
            title: "",
            sizes: "",
            imageUrl: "",
            calories: "",
            weight: "",
            types: "",
            category: "",
            rating: "",
         }}
         validationSchema={Yup.object({
            price: Yup.number()
               .required("Необходимо заполнить поле")
               .max(2000, "Слишком большая стоимость!"),
            title: Yup.string()
               .required("Необходимо заполнить поле")
               .max(30, "Слишком большое название!"),
            sizes: Yup.string().required("Необходимо заполнить поле"),
            types: Yup.string().required("Необходимо заполнить поле"),
            imageUrl: Yup.string().required("Необходимо заполнить поле"),
            calories: Yup.string(),
            weight: Yup.string(),
            category: Yup.number()
               .required("Необходимо заполнить поле")
               .min(1, "Категоря не может быть меньше 1 -й")
               .max(5, "Категоря не может быть выше 5 -й"),
            rating: Yup.number()
               .required("Необходимо заполнить поле")
               .min(1, "Рэйтинг не может быть ниже 1")
               .max(10, "Рэйтинг не может быть больше 10"),
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            const pizzaSerivce = new PizzaService();

            const pizzaObj: Pizza = {
               ...values,
               sizes: values.sizes.split(", "),
               types: values.types.split(", "),
            };

            pizzaSerivce.postPizzas(JSON.stringify(pizzaObj, null, 2));

            setSubmitting(false);
            resetForm();
         }}
      >
         {({ isSubmitting, errors, touched }) => (
            <Form>
               <Field
                  className={`${s.modalInput}${errors.price && touched.price ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="price"
                  placeholder="Стоимсть"
               />
               <ErrorMessage name="price" component="div" />
               <Field
                  className={`${s.modalInput}${errors.title && touched.title  ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="title"
                  placeholder="Название"
               />
               <ErrorMessage name="title" component="div" />
               <Field
                  className={`${s.modalInput}${errors.sizes && touched.sizes ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="sizes"
                  placeholder="Размеры"
               />
               <ErrorMessage name="sizes" component="div" />
               <Field
                  className={`${s.modalInput}${errors.types && touched.types ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="types"
                  placeholder="Типы"
               />
               <ErrorMessage name="types" component="div" />
               <Field
                  className={`${s.modalInput}${errors.imageUrl && touched.imageUrl ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="imageUrl"
                  placeholder="Ссылка на изображение"
               />
               <ErrorMessage name="imageUrl" component="div" />
               <Field
                  className={`${s.modalInput}${errors.calories && touched.calories ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="calories"
                  placeholder="Каллории"
               />
               <ErrorMessage name="calories" component="div" />
               <Field
                  className={`${s.modalInput}${errors.weight && touched.weight ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="weight"
                  placeholder="Масса"
               />
               <ErrorMessage name="weight" component="div" />
               <Field
                  className={`${s.modalInput}${errors.category && touched.category ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="category"
                  placeholder="Категория"
               />
               <ErrorMessage name="category" component="div" />
               <Field
                  className={`${s.modalInput}${errors.rating && touched.rating ? ` ${s.modalInputError}`: ''}`}
                  type="text"
                  name="rating"
                  placeholder="Рэйтинг"
               />
               <ErrorMessage name="rating" component="div" />
               <button
                  className="button button--outline button--add button--modal"
                  type="submit"
                  disabled={isSubmitting}
               >
                  Добавить товар
               </button>
               <div>Товар добавлен</div>
            </Form>
         )}
      </Formik>
   </div>
);

export default NewProducModal;
