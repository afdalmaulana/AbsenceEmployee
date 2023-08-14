import {
  Box,
  Button,
  Flex,
  Select,
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
import SideBar from "../../Components/sideBar";

export default function Reports() {
  const URL_API = process.env.REACT_APP_API_BASE_URL;
  const [isLoading, setLoading] = useState(false);
  const [salaryHistory, setSalaryHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const fetchSalaryRecord = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const fetchData = await axios.get(
        `${URL_API}/employee/salary?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  }, [selectedMonth, selectedYear]);
  return (
    <>
      <Navbar />
      <Flex>
        <SideBar />
        <Box
          fontFamily={"montserrat"}
          ml={{ md: "220", lg: "280px" }}
          w={"100%"}
          mr={"30px"}
        >
          <Box mt={"32px"} ml={"12px"}>
            <Text fontSize={"32px"}>Employee Salary Reports</Text>
            <Button
              leftIcon={<MdAttachMoney />}
              bgColor={"#7C9D96"}
              _hover={{ bgColor: "green" }}
              onClick={() => calculate()}
            >
              {isLoading ? <Spinner /> : "Generate All Salary"}
            </Button>
          </Box>
          <Flex justifyContent={"space-around"} mt={10}>
            <Select
              w={"300px"}
              placeholder="All Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value={"1"}>January</option>
              <option value={"2"}>February</option>
              <option value={"3"}>March</option>
              <option value={"4"}>April</option>
              <option value={"5"}>May</option>
              <option value={"6"}>June</option>
              <option value={"7"}>July</option>
              <option value={"8"}>August</option>
              <option value={"9"}>September</option>
              <option value={"10"}>October</option>
              <option value={"11"}>November</option>
              <option value={"12"}>December</option>
            </Select>
            <Select
              w={"300px"}
              placeholder="All Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value={"2023"}>2023</option>
              <option value={"2022"}>2022</option>
              <option value={"2021"}>2021</option>
            </Select>
          </Flex>
          <Table variant={"striped"} colorScheme="teal">
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
      </Flex>
    </>
  );
}
