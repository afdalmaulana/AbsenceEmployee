import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/reducer/AuthReducer";
import RegistrasiEmployee from "../Pages/Admins/RegistrasiEmployee";
import HistoryWork from "../Pages/Employee/HistroryWork";
import ButtonReport from "./ButtonReport";
import { Link } from "react-router-dom";
import ButtonLogout from "./ButtonLogout";
import ButtonRegistrasiEmployee from "../Pages/Admins/ButtonRegistrasiEmployee";

export default function Navbar() {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  return (
    <>
      <Box
        w={"100%"}
        h={"60px"}
        bgColor={"#F5F5F5"}
        color={"black"}
        fontFamily={"montserrat"}
        pos={"sticky"}
        top={0}
        zIndex={1000}
      >
        <Flex>
          <Link to={"/"}>
            <Text fontSize={"40px"}>Focus</Text>
          </Link>
          <Spacer />
          <Box mt={"10px"} mr={10}>
            <Text fontSize={"24px"}>Role : {user.Role?.role}</Text>
          </Box>
          {user.roleId === 1 ? <ButtonRegistrasiEmployee /> : ""}
          <ButtonLogout />
          {/* <Box>{user.roleId === 1 ? <ButtonLogout /> : ""}</Box> */}
        </Flex>
      </Box>
    </>
  );
}
