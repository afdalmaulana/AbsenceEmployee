import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonLogout from "./ButtonLogout";
import ButtonRegistrasiEmployee from "../Pages/Admins/ButtonRegistrasiEmployee";

export default function Navbar() {
  const { user } = useSelector((state) => state.AuthReducer);
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
          {user.roleId === 1 ? <ButtonRegistrasiEmployee /> : ""}
          <ButtonLogout />
        </Flex>
      </Box>
    </>
  );
}
