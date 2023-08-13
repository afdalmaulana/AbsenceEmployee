import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function HistoryWork() {
  const navigate = useNavigate();
  function toHistory() {
    navigate("/history");
  }
  return (
    <>
      <Box>
        <Button
          variant={"unstyled"}
          mt={"10px"}
          mr={"20px"}
          onClick={() => toHistory()}
        >
          History
        </Button>
      </Box>
    </>
  );
}
