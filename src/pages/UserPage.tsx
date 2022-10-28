import { FC } from "react";
import { useSelector } from "react-redux";
import AdminPannel from "../components/adminPannel/AdminPannel";
import UserAccount from "../components/userAccount/UserAccount";
import { RootState } from "../redux/store";

const UserPage: FC = () => {
   const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

   return (
      <div className="container container--cart">
         <div className="cart">
            {isAdmin ? <AdminPannel/> : <UserAccount/>}
         </div>
      </div>
   );
};

export default UserPage;
