import { Box, Button, Stack, Text } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";

export default function DashBoardEmployee() {
  const [currentTime, setTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <Navbar />
      <Box fontFamily={"montserrat"}>
        <Stack>
          <Box
            w={"300px"}
            m={"50px 100px"}
            boxShadow={"lg"}
            textAlign={"center"}
            fontSize={"24px"}
          >
            <Text>{currentDate.toLocaleDateString()}</Text>
            <Text>{daysOfWeek[currentDate.getDay()]}</Text>
            <Text>{currentTime.toLocaleTimeString()} WITA</Text>
            <Button leftIcon={<BiLogIn />} colorScheme="green">
              Clock in
            </Button>
            <Button
              colorScheme="red"
              rightIcon={<RiLogoutBoxRLine />}
              ml={"20px"}
            >
              Clock out
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
