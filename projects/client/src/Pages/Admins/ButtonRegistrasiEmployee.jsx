import { Box, Button, useDisclosure } from "@chakra-ui/react";
import RegistrasiEmployee from "./RegistrasiEmployee";
import { BsPersonPlus } from "react-icons/bs";

export default function ButtonRegistrasiEmployee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Button
          leftIcon={<BsPersonPlus size={"20px"} />}
          bgColor={"#F5F5F5"}
          _hover={{ bgColor: "#7C9D96" }}
          mr={"20px"}
          mt={"10px"}
          onClick={onOpen}
        >
          Add Employee
        </Button>
        <RegistrasiEmployee isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}
