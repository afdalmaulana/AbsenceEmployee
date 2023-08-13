import { Box, Text } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

export default function HistroryPage() {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <>
      <Navbar />
      <Box fontFamily={"montserrat"}>
        <Text fontSize={"40px"}>Working History</Text>
      </Box>
    </>
  );
}
