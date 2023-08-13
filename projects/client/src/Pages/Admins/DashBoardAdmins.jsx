import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";
import ButtonLogout from "../../Components/ButtonLogout";
import { useSelector } from "react-redux";
import ButtonReport from "../../Components/ButtonReport";
import RegistrasiEmployee from "./RegistrasiEmployee";
import HistoryWork from "../Employee/HistroryWork";
import { useState } from "react";

export default function DashBoardAdmins() {
  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <Navbar />
      <Box fontFamily={"montserrat"}>
        <Text fontSize={"40px"}>Welcome Admin</Text>
      </Box>
    </>
  );
}
