import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../../Components/Navbar";
import { useEffect, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clockIn, clockOut } from "../../redux/reducer/HistoryReducer";
import ButtonReport from "../../Components/ButtonReport";
import RegistrasiEmployee from "../Admins/RegistrasiEmployee";
import HistoryWork from "./HistroryWork";
import { Link } from "react-router-dom";
import ButtonLogout from "../../Components/ButtonLogout";
import ButtonReports from "./ButtonReports";
const URL_API = process.env.REACT_APP_API_BASE_URL;

export default function DashBoardEmployee() {
  const [attendence, setAttendence] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer);
  // const { history } = useSelector((state) => state.HistoryReducer);
  // console.log(user.Role);
  const [timeClockIn, setTimeClockIn] = useState([]);
  const [currentTime, setTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(`${URL_API}/attendence/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendence(respon.data.history);
      // dispatch(setHistory(respon.data.history));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClockOut = async () => {
    dispatch(clockOut(toast));
    setTimeClockIn(new Date());
  };
  const handleClockin = async () => {
    dispatch(clockIn(toast));
  };
  useEffect(() => {
    fetchHistory();
  }, [attendence]);
  return (
    <>
      <Navbar />
      <Box fontFamily={"montserrat"}>
        <Stack>
          <Flex>
            <Box
              h={"100vh"}
              pos={"fixed"}
              left={0}
              top={0}
              zIndex={1000}
              bgColor={"#7C9D96"}
              color={"#321E1E"}
              w={{ md: "180px", lg: "240px" }}
              pl={"20px"}
            >
              <Link to={"/"}>
                <Text fontSize={{ md: "24px", lg: "36px" }}>
                  Focus Attendence
                </Text>
              </Link>
              <Divider size={"lg"} />
              {/* <Spacer /> */}
              {user.roleId === 1 ? <ButtonReport /> : ""}
              {user.roleId === 1 ? <RegistrasiEmployee /> : <HistoryWork />}
              {user.roleId === 1 ? "" : <ButtonReports />}
            </Box>
            <Box
              boxShadow={"lg"}
              fontSize={"24px"}
              ml={{ sm: "180px", md: "180px", lg: "240px" }}
            >
              <Box>
                <Center>
                  <Stack>
                    <Text fontSize={"36px"}>
                      {currentDate.toLocaleDateString()}
                    </Text>
                    <Text fontSize={"24px"}>
                      {currentTime.toLocaleTimeString()} WITA
                    </Text>
                  </Stack>
                </Center>
                <Box pl={"40px"}>
                  <Button
                    leftIcon={<BiLogIn />}
                    colorScheme="green"
                    w={{ md: "330px", lg: "500px" }}
                    onClick={() => handleClockin()}
                    // isDisabled={user.roleId === 2}
                  >
                    Clock in
                  </Button>
                  <Button
                    colorScheme="red"
                    rightIcon={<RiLogoutBoxRLine />}
                    ml={"20px"}
                    w={{ md: "330px", lg: "500px" }}
                    onClick={() => handleClockOut()}
                  >
                    Clock out
                  </Button>
                  <Box>
                    {/* <Text>Last time Clock in : {timeClockIn}</Text> */}
                  </Box>
                </Box>
              </Box>
              <Box mt={"16px"} pl={"50px"}>
                <Text>Attendence History</Text>
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
                    {attendence.map((item) => {
                      return (
                        <Tr key={item.id}>
                          <Td>{new Date(item.clockIn).toLocaleString()}</Td>
                          <Td>{new Date(item.clockOut).toLocaleString()}</Td>
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
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
