import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "./SignUpModal.module.scss";
import { setOrderActive } from "../../redux/modals/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { OrderItem } from "../../@types/Order";
import { clearOrderError, makeOrder } from "../../redux/order/slice";
import spinner from "../../assets/img/spinner.svg";

const OrderModal: FC = () => {
   const [req, setReq] = useState<boolean>(false);

   const orderActive = useSelector(
      (state: RootState) => state.modals.orderActive
   );

   const { errorMessage, loadingStatus } = useSelector(
      (state: RootState) => state.order
   );

   const orderItems: OrderItem[] = useSelector((state: RootState) =>
      state.cart.items.map((cartItem) => {
         return {
            title: cartItem.title,
            size: cartItem.size,
            dough: cartItem.type === 0 ? "токное" : "традиционное",
            image: cartItem.imageUrl,
            count: cartItem.count,
         };
      })
   );

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (loadingStatus === "idle" && req) {
         setTimeout(() => {
            dispatch(setOrderActive(false));
            dispatch(clearOrderError());
         }, 2000);
      }
   }, [loadingStatus]);

   if (loadingStatus === "loading" && orderActive) {
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
                  onClick={() => dispatch(setOrderActive(false))}
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

   if (orderActive) {
      return (
         <div
            className={s.modal}
            onClick={(e) => {
               const target = e.target as Element;

               if (target.classList.contains(s.modal)) {
                  dispatch(setOrderActive(false));
               }
            }}
         >
            <div className={s.modalContent}>
               <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={s.modalClose}
                  onClick={() => dispatch(setOrderActive(false))}
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                     fill="white"
                  ></path>
               </svg>
               <h2>Оформление заказа</h2>
               <Formik
                  initialValues={{
                     email: "",
                     phone: "",
                     name: "",
                  }}
                  validationSchema={Yup.object({
                     email: Yup.string()
                        .required("Необходимо заполнить поле")
                        .email("Проверьте правильность заполнения email"),
                     phone: Yup.string()
                        .required("Необходимо заполнить поле")
                        .matches(
                           /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                           "Телефон указан в неверном формате"
                        ),
                     name: Yup.string().required("Необходимо заполнить поле"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                     setReq(true);

                     await dispatch(
                        makeOrder({
                           email: values.email,
                           phone: values.phone,
                           name: values.name,
                           orderItems,
                        })
                     );

                     setSubmitting(false);
                     resetForm();
                  }}
               >
                  {({ isSubmitting, errors, touched }) => (
                     <Form>
                        <Field
                           className={`${s.modalInput}${
                              errors.email && touched.email
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="email"
                           name="email"
                           placeholder="example@mail.ru"
                        />
                        <ErrorMessage
                           name="email"
                           component="div"
                           className={s.modalError}
                        />

                        <Field
                           className={`${s.modalInput}${
                              errors.phone && touched.phone
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="phone"
                           placeholder="Номер телефона"
                        />
                        <ErrorMessage
                           name="phone"
                           component="div"
                           className={s.modalError}
                        />

                        <Field
                           className={`${s.modalInput}${
                              errors.name && touched.name
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="name"
                           placeholder="Имя"
                        />
                        <ErrorMessage
                           name="name"
                           component="div"
                           className={s.modalError}
                        />

                        {errorMessage ? (
                           <div className={s.modalError}>{errorMessage}</div>
                        ) : null}
                        <button
                           className="button button--outline button--add button--modal"
                           type="submit"
                           disabled={isSubmitting}
                        >
                           Оформить заказ
                        </button>
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

export default OrderModal;
