import {
  Box,
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Navbar from "../../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdAttachMoney } from "react-icons/md";

export default function Reports() {
  const URL_API = process.env.REACT_APP_API_BASE_URL;
  const [isLoading, setLoading] = useState(false);
  const [salaryHistory, setSalaryHistory] = useState([]);
  const fetchSalaryRecord = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const fetchData = await axios.get(`${URL_API}/employee/salary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSalaryHistory(fetchData.data.respon);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculate = async () => {
    console.log("calculate");
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.post(
        `${URL_API}/employee/salary`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSalaryRecord();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalaryRecord();
  }, []);
  return (
    <>
      <Navbar />
      <Box fontFamily={"montserrat"}>
        <Box mt={"32px"} ml={"12px"}>
          <Text fontSize={"32px"}>Employee Salary Reports</Text>
          <Button
            leftIcon={<MdAttachMoney />}
            bgColor={"#7C9D96"}
            _hover={{ bgColor: "green" }}
            onClick={() => calculate()}
          >
            {isLoading ? <Spinner /> : "Calculate All Salary"}
          </Button>
        </Box>
        <Table variant={"striped"} colorScheme="cyan">
          <Thead>
            <Tr>
              <Th>Total Salary</Th>
              <Th>Total Deduction</Th>
              <Th>Month</Th>
              <Th>Year</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salaryHistory.map((item) => {
              return (
                <Tr key={item.id}>
                  <Td>{item.totalSalary}</Td>
                  <Td>{item.salaryCuts}</Td>
                  <Td>{item.month}</Td>
                  <Td>{item.year}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
