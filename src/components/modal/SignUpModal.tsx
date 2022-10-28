import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "./SignUpModal.module.scss";
import { setSignUpActive } from "../../redux/modals/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { clearAuthError, registration } from "../../redux/auth/slice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import spinner from "../../assets/img/spinner.svg";

const SignUpModal: FC = () => {
   const [req, setReq] = useState<boolean>(false);

   const signUpActive = useSelector(
      (state: RootState) => state.modals.signUpActive
   );

   const { loadingStatus, errorMessage } = useSelector(
      (state: RootState) => state.auth
   );

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (loadingStatus === "idle" && req) {
         dispatch(setSignUpActive(false));
      }
   }, [loadingStatus]);

   const closeModal = () => {
      dispatch(setSignUpActive(false));
      dispatch(clearAuthError());
   };

   if (loadingStatus === "loading" && signUpActive) {
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
                  onClick={() => closeModal()}
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

   if (signUpActive) {
      return (
         <div
            className={s.modal}
            onClick={(e) => {
               const target = e.target as Element;

               if (target.classList.contains(s.modal)) {
                  closeModal();
               }
            }}
            onKeyUp={() => console.log("up")}
         >
            <div className={s.modalContent}>
               <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={s.modalClose}
                  onClick={() => closeModal()}
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                     fill="white"
                  ></path>
               </svg>
               <h2>Регистрация</h2>
               <Formik
                  initialValues={{
                     email: "",
                     password: "",
                     name: "",
                     surname: "",
                     phone: "",
                     date: "",
                     checkbox: false,
                  }}
                  validationSchema={Yup.object({
                     email: Yup.string()
                        .required("Необходимо заполнить поле")
                        .email("Проверьте правильность заполнения email"),
                     password: Yup.string()
                        .required("Необходимо заполнить поле")
                        .min(4, "Пароль должен быть больше 4 символов")
                        .matches(
                           /\d/,
                           "Пароль должен содержать хотя бы одну цифру"
                        )
                        .matches(
                           /[А-ЯA-Z]/,
                           "Пароль должен содержать хотя бы одну заглавную букву"
                        )
                        .matches(
                           /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}]/,
                           "Пароль должен содержать хотя бы один спец.символ"
                        ),
                     name: Yup.string().required("Необходимо заполнить поле"),
                     surname: Yup.string().required(
                        "Необходимо заполнить поле"
                     ),
                     phone: Yup.string()
                        .required("Необходимо заполнить поле")
                        .matches(
                           /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                           "Телефон указан в неверном формате"
                        ),
                     date: Yup.date(),
                     checkbox: Yup.boolean().oneOf(
                        [true],
                        "Необходимо согласие"
                     ),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                     dispatch(registration({ ...values }));

                     setSubmitting(false);
                     setReq(true);
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
                           placeholder="Почта (example@mail.ru)"
                        />
                        <ErrorMessage
                           name="email"
                           component="div"
                           className={s.modalError}
                        />
                        <Field
                           className={`${s.modalInput}${
                              errors.password && touched.password
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="password"
                           name="password"
                           placeholder="Пароль"
                        />
                        <ErrorMessage
                           name="password"
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
                        <Field
                           className={`${s.modalInput}${
                              errors.surname && touched.surname
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="surname"
                           placeholder="Фамилия"
                        />
                        <ErrorMessage
                           name="surname"
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
                              errors.date && touched.date
                                 ? ` ${s.modalInputError}`
                                 : ""
                           }`}
                           type="text"
                           name="date"
                           placeholder="Дата рождения(год-месяц-число)"
                        />
                        <ErrorMessage
                           name="date"
                           component="div"
                           className={s.modalError}
                        />

                        <Field as="label" className={s.checkLabel}>
                           Принимаю политику конфиденциальности
                           <Field
                              type="checkbox"
                              placeholder="Польз.соглашение"
                              name="checkbox"
                           />
                        </Field>
                        <ErrorMessage
                           name="checkbox"
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
                           Зарегистрироваться
                        </button>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      );
   }

   return null;
};

export default SignUpModal;
