import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ButtonReports() {
  const navigate = useNavigate();
  function toReport() {
    navigate("/report");
  }
  return (
    <>
      <Button variant={"unstyled"} onClick={() => toReport()}>
        Report
      </Button>
    </>
  );
}
