import {
  Box,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import SideBar from "../Components/sideBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HistroryPage() {
  const URL_API = process.env.REACT_APP_API_BASE_URL;
  const [history, setHistory] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer);
  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(`${URL_API}/attendence/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(respon.data.history);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <>
      <Navbar />
      <Flex>
        <SideBar />
        <Box fontFamily={"montserrat"} ml={{ md: "180px", lg: "240px" }}>
          <Stack>
            <Text ml={"50px"} fontSize={"32px"}>
              Attendence History
            </Text>
            <Box mt={"16px"} pl={"50px"}>
              <Table variant={"striped"} colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Clock in</Th>
                    <Th>Clock Out</Th>
                    <Th>Working Hours</Th>
                    <Th>Day Salary</Th>
                    <Th>Month</Th>
                    <Th>Deduction</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize={"12px"}>
                  {history.map((item) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{new Date(item.clockIn).toLocaleString()}</Td>
                        <Td>
                          {item.clockOut
                            ? new Date(item.clockOut).toLocaleString()
                            : "Employee Not Clock Out Yet"}
                        </Td>
                        <Td>{item.hourlyWork}</Td>
                        <Td>{item.daySalary}</Td>
                        <Td>{item.month}</Td>
                        <Td>{item.cuts}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
