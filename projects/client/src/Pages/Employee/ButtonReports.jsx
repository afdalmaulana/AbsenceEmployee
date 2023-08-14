import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TbReportMoney } from "react-icons/tb";

export default function ButtonReports() {
  const navigate = useNavigate();
  function toReport() {
    navigate("/report");
  }
  return (
    <>
      <Button
        rightIcon={<TbReportMoney />}
        variant={"unstyled"}
        onClick={() => toReport()}
      >
        Payroll Report
      </Button>
    </>
  );
}
