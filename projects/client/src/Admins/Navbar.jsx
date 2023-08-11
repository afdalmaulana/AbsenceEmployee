import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/AuthReducer";
import RegistrasiEmployee from "./RegistrasiEmployee";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <>
      <Box w={"100%"} h={"60px"} bgColor={"brown"} fontFamily={"montserrat"}>
        <Flex>
          <Text fontSize={"40px"}>Focus</Text>
          <Spacer />
          <RegistrasiEmployee />
          <Button
            mt={"10px"}
            onClick={() => dispatch(userLogout())}
            mr={"10px"}
          >
            Logout
          </Button>
        </Flex>
      </Box>
    </>
  );
}
