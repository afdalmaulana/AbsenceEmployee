import { Box, Button, useDisclosure } from "@chakra-ui/react";
import RegistrasiEmployee from "./RegistrasiEmployee";

export default function ButtonRegistrasiEmployee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Button variant={"unstyled"} mr={"20px"} mt={"10px"} onClick={onOpen}>
          Add Employee
        </Button>
        <RegistrasiEmployee isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}
