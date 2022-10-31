import { FC } from "react";
import { useSelector } from "react-redux";
import s from "./SignUpModal.module.scss";
import { setNewProducActive } from "../../redux/modals/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoadingStatus, PizzaPost } from "../../redux/pizza/types";
import { postPizza } from "../../redux/pizza/slice";
import spinner from "../../assets/img/spinner.svg";

const NewProducModal: FC = () => {
   const newProducActive = useSelector(
      (state: RootState) => state.modals.newProducActive
   );

   const { addingMessage, addingStatus } = useSelector(
      (state: RootState) => state.pizzas
   );

   const dispatch = useAppDispatch();

   if (addingStatus === LoadingStatus.LOADING && newProducActive) {
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
                  onClick={() => setNewProducActive(false)}
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                     fill="white"
                  ></path>
               </svg>

               <div className={s.loadingContent}>
                  <img className={s.modalSpinner} src={spinner} alt="spinner" />
                  Загрузка...
               </div>
            </div>
         </div>
      );
   }

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
                  onClick={() => dispatch(setNewProducActive(false))}
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                     fill="white"
                  ></path>
               </svg>

               <h2>Добавление нового товара</h2>
               <Formik
                  initialValues={{
                     price: "",
                     title: "",
                     sizes: "",
                     imageUrl: "",
                     types: "",
                     category: "",
                     rating: "",
                  }}
                  validationSchema={Yup.object({
                     price: Yup.number()
                        .required("Укажите цену")
                        .max(2000, "Слишком большая стоимость!"),
                     title: Yup.string()
                        .required("Укажите название")
                        .max(30, "Слишком большое название!"),
                     sizes: Yup.string()
                        .required("Укажите размеры")
                        .matches(
                           /^(\d\d,\s){1,2}\d\d$|^\d\d$/,
                           "Размеры через запятую с пробелом, не более трёх"
                        ),
                     types: Yup.string()
                        .required("Укажите типы")
                        .matches(
                           /^([01],\s){0,1}[01]$|^[01]$/,
                           "Возможные типы(0/1), через запятую с пробелом, не более двух"
                        ),
                     imageUrl: Yup.string().required("Вставьте изображение"),
                     category: Yup.number()
                        .required("Укажите категорию")
                        .min(1, "Категоря не может быть меньше 1 -й")
                        .max(5, "Категоря не может быть выше 5 -й"),
                     rating: Yup.number()
                        .required("Укажите рэйтинг")
                        .min(1, "Рэйтинг не может быть ниже 1")
                        .max(10, "Рэйтинг не может быть больше 10"),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {

                     const pizzaObj: PizzaPost = {
                        ...values,
                        sizes: values.sizes.split(", "),
                        types: values.types.split(", "),
                     };

                     

                     dispatch(postPizza(pizzaObj));

                     setSubmitting(false);
                     resetForm();
                  }}
               >
                  {({ isSubmitting, errors, touched }) => (
                     <Form>
                        <Field
                           className={`${s.modalInput}${
                              errors.price && touched.price
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="price"
                           placeholder="Стоимсть"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="price"
                           component="div"
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.title && touched.title
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="title"
                           placeholder="Название"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="title"
                           component="div"
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.sizes && touched.sizes
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="sizes"
                           placeholder="Размеры"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="sizes"
                           component="div"
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.types && touched.types
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="types"
                           placeholder="Типы"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="types"
                           component="div"
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.imageUrl && touched.imageUrl
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="imageUrl"
                           placeholder="Ссылка на изображение"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="imageUrl"
                           component="div"
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.category && touched.category
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="category"
                           placeholder="Категория"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="category"
                           component="div"
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.rating && touched.rating
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="rating"
                           placeholder="Рэйтинг"
                        />
                        <ErrorMessage
                           className={s.modalErrorInput}
                           name="rating"
                           component="div"
                        />
                        <button
                           className="button button--outline button--add button--modal"
                           type="submit"
                           disabled={isSubmitting}
                        >
                           Добавить товар
                        </button>
                        {addingStatus === LoadingStatus.ERROR ? addingMessage : ''}
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      );
   } else {
      return null;
   }
};

export default NewProducModal;
