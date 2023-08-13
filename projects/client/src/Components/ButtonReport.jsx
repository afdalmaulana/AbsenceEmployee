import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ButtonReport() {
  const navigate = useNavigate();
  function toReport() {
    navigate("/report");
  }
  return (
    <>
      <Box mt={"10px"} mr={"10px"}>
        <Button variant={"unstyled"} onClick={() => toReport()}>
          Report
        </Button>
      </Box>
    </>
  );
}
