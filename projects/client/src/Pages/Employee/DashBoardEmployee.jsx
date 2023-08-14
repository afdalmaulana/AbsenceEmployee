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
  VStack,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../../Components/Navbar";
import { useEffect, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clockIn, clockOut } from "../../redux/reducer/HistoryReducer";
import SideBar from "../../Components/sideBar";

const URL_API = process.env.REACT_APP_API_BASE_URL;

export default function DashBoardEmployee() {
  const [attendence, setAttendence] = useState([]);
  const [clockInStatus, setClockInStatus] = useState(false);
  const [timeClockIn, setTimeClockIn] = useState([]);
  const [clockOutStatus, setClockOutStatus] = useState(false);
  const [timeClockOut, setTimeClockOut] = useState([]);
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

  const handleClockOut = async () => {
    dispatch(clockOut(toast));
    setTimeClockOut(new Date());
    setClockOutStatus(true);
    console.log("clockout");
  };
  const handleClockin = async () => {
    dispatch(clockIn(toast));
    setTimeClockIn(new Date());
    setClockInStatus(true);
    console.log("clockin");
  };
  return (
    <>
      <Navbar />
      <Box fontFamily={"montserrat"}>
        <Stack>
          <Flex>
            <SideBar />
            <Box
              fontSize={"24px"}
              ml={{ sm: "180px", md: "180px", lg: "280px" }}
            >
              <Box>
                <Center>
                  <Stack>
                    <Text fontSize={"36px"}>
                      {currentDate.toLocaleDateString()}
                    </Text>
                    <Text fontSize={"26px"}>
                      {currentTime.toLocaleTimeString()} WITA
                    </Text>
                  </Stack>
                </Center>
                <Box pl={"40px"} mt={"30px"}>
                  <Button
                    leftIcon={<BiLogIn />}
                    colorScheme="green"
                    w={{ md: "330px", lg: "500px" }}
                    onClick={() => handleClockin()}
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
                    {clockInStatus && timeClockIn && (
                      <VStack mt={4} spacing={2} fontWeight={"bold"}>
                        <Box textColor={"green.500"} textAlign={"center"}>
                          <Text>Clock In Status : Successful</Text>
                          <Text>HAPPY WORKING</Text>
                        </Box>
                        <Text>
                          Clock In Time: {timeClockIn.toLocaleString()}
                        </Text>
                      </VStack>
                    )}
                  </Box>
                  <Box>
                    {clockOutStatus && timeClockOut && (
                      <VStack mt={4} spacing={2} fontWeight={"bold"}>
                        <Box textColor={"green.500"} textAlign={"center"}>
                          <Text>Clock Out Status : Successful</Text>
                        </Box>
                        <Text>
                          Clock Out Time: {timeClockOut.toLocaleString()}
                        </Text>
                      </VStack>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
