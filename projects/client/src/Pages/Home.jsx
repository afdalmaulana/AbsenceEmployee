import { Box } from "@chakra-ui/react";
import Login from "../Components/Login";
import { useSelector } from "react-redux";
import DashBoardAdmins from "./DashBoardAdmins";
import DashBoardEmployee from "./DashBoardEmployee";

export default function Home() {
  const { login } = useSelector((state) => state.AuthReducer);
  console.log("login", login);
  const { user } = useSelector((state) => state.AuthReducer);
  console.log("USER => ", user);
  return (
    <>
      <main>
        {!login ? (
          <Login />
        ) : user.roleId === 1 ? (
          <DashBoardAdmins />
        ) : (
          <DashBoardEmployee />
        )}
      </main>
    </>
  );
}
