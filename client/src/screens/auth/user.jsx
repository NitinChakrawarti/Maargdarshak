import { useDispatch, useSelector } from "react-redux";
import ProfileComponent from "../../components/user/userProfile";

const User = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <>

      <ProfileComponent user={user} />

    </>
  );
};

export default User;
