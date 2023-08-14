import {
  Box,
  Center,
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
import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux";
import RegistrasiEmployee from "./RegistrasiEmployee";
import { useEffect, useState } from "react";
import SideBar from "../../Components/sideBar";
import axios from "axios";

export default function DashBoardAdmins() {
  const { user } = useSelector((state) => state.AuthReducer);
  const URL_API = process.env.REACT_APP_API_BASE_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respon = await axios.get(
          `${URL_API}/auth-management/auth/account`
        );
        setUsers(respon.data.account);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const getRoleName = (roleID) => {
    switch (roleID) {
      case 1:
        return "Admin";
      case 2:
        return "Karyawan Pagi";
      case 3:
        return "Karyawan Malam";
      default:
        return "Unknown";
    }
  };

  const filteredUsers = users.filter((user) => user.roleID !== 1);
  return (
    <>
      <Navbar />
      <Flex>
        <SideBar />
        <Box fontFamily={"montserrat"} ml={{ md: "180px", lg: "250px" }}>
          <Stack>
            <Text fontSize={"32px"}>List Employee</Text>
            <Table variant={"striped"} colorScheme="cyan">
              <Thead>
                <Tr>
                  <Th>Full Name</Th>
                  <Th>Email</Th>
                  <Th>Birthday</Th>
                  <Th>Role</Th>
                  <Th>Base Salary</Th>
                  <Th>Day Salary</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{item.fullName}</Td>
                      <Td>{item.email}</Td>
                      <Td>
                        {item.birthday
                          ? new Date(item.birthday).toLocaleDateString()
                          : ""}
                      </Td>
                      <Td>{getRoleName(item.roleId)}</Td>
                      <Td>{item.daySalary}</Td>
                      <Td>{item.daySalary}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
