import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./SignUpModal.module.scss";
import { setSignInActive } from "../../redux/modals/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { login } from "../../redux/auth/slice";
import spinner from "../../assets/img/spinner.svg";

const SignInModal: FC = () => {
   const [req, setReq] = useState<boolean>(false);

   const signInActive = useSelector(
      (state: RootState) => state.modals.signInActive
   );

   const { errorMessage, regLoading } = useSelector(
      (state: RootState) => state.auth
   );

   useEffect(() => {
      if (regLoading === 'idle' && req) {
         dispatch(setSignInActive());
      }
   }, [regLoading]);

   const dispatch = useAppDispatch();

   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");

   if (regLoading === "loading" && signInActive) {
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
                  onClick={() => dispatch(setSignInActive())}
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

   if (signInActive) {
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
                  onClick={() => dispatch(setSignInActive())}
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                     fill="white"
                  ></path>
               </svg>
               <h2>Авторизация</h2>
               <form>
                  <input
                     className={s.modalInput}
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                     className={s.modalInput}
                     type="text"
                     placeholder="Пароль"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className={s.checkLabel}>
                     Запомнить меня
                     <input type="checkbox" />
                  </label>
                  {errorMessage ? <div className={s.modalError}>{errorMessage}</div> : null}
                  <button
                     onClick={async (e) => {
                        e.preventDefault();
                        dispatch(login({ email, password }));
                        setEmail("");
                        setPassword("");
                        setReq(true);
                     }}
                     className="button button--outline button--add button--modal"
                  >
                     Авторизироваться
                  </button>
               </form>
            </div>
         </div>
      );
   }

   return null;
};

export default SignInModal;
