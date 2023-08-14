import { Link } from "react-router-dom";

import { Box, Divider, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import RegistrasiEmployee from "../Pages/Admins/RegistrasiEmployee";
import HistoryWork from "../Pages/Employee/HistroryWork";
import ButtonReports from "../Pages/Employee/ButtonReports";

export default function SideBar() {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <>
      <Box
        h={"100vh"}
        pos={"fixed"}
        left={0}
        top={0}
        zIndex={1000}
        bgColor={"#7C9D96"}
        color={"#321E1E"}
        w={{ md: "180px", lg: "240px" }}
        fontFamily={"montserrat"}
      >
        <Link to={"/"}>
          <Text fontSize={{ md: "24px", lg: "36px" }}>Focus Attendence</Text>
        </Link>
        <Divider size={"lg"} />
        <Box ml={"10px"} mt={"20px"}>
          <Text fontSize={"16px"}>Role : {user.Role?.role}</Text>
          {user.roleId === 1 ? <RegistrasiEmployee /> : <HistoryWork />}
          {user.roleId === 1 ? "" : <ButtonReports />}
        </Box>
      </Box>
    </>
  );
}
