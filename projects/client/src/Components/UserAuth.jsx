import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userKeepLogin } from "../redux/reducer/AuthReducer";

export default function UserAuth({ children }) {
  const { user } = useSelector((state) => state.AuthReducer);
  console.log("keeplogin", user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userKeepLogin());
  }, [dispatch]);
  return <>{children}</>;
}
