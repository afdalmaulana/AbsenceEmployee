import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getRole, registEmployee } from "../../redux/reducer/AuthReducer";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";

export default function RegistrasiEmployee({ isOpen, onClose }) {
  const empoSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address format"),
    roleId: Yup.string().required("Role is required"),
    baseSalary: Yup.string().required("is Required"),
    daySalary: Yup.string().required("is Required"),
  });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      roleId: "",
      baseSalary: "",
      daySalary: "",
    },
    validationSchema: empoSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(registEmployee(values, setLoading, toast));
    },
  });

  useEffect(() => {
    dispatch(getRole());
  }, []);
  const { role } = useSelector((state) => state.AuthReducer);
  return (
    <>
      {/* <Button onClick={onOpen} mt={"10px"} mr={"10px"}>
        Add Employee
      </Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"montserrat"}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>Add New Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody pt={"20px"}>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <Text fontSize={"16px"} ml={"30px"}>
                  Email Address
                </Text>
                <InputGroup ml={"30px"} mt={"12px"}>
                  <InputLeftElement>
                    <BsPersonCircle />
                  </InputLeftElement>
                  <Input
                    placeholder="Type here"
                    id="email"
                    name="email"
                    w={"350px"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  ></Input>
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <Select
                {...formik.getFieldProps("roleId")}
                mt={"12px"}
                ml={"30px"}
                w={"350px"}
                placeholder="Pilih Role"
              >
                {role.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.role}
                  </option>
                ))}
              </Select>
              <FormControl
                isInvalid={
                  formik.touched.baseSalary && formik.errors.baseSalary
                }
              >
                <Text ml={"30px"} mt={"16px"}>
                  Salary
                </Text>
                <InputGroup mt={"12px"} ml={"30px"} w={"350px"}>
                  <InputLeftElement>
                    <CiMoneyCheck1 />
                  </InputLeftElement>
                  <Input
                    placeholder="Amount"
                    id="baseSalary"
                    name="baseSalary"
                    value={formik.values.baseSalary}
                    onChange={formik.handleChange}
                  ></Input>
                  {formik.touched.baseSalary && formik.errors.baseSalary && (
                    <FormErrorMessage>
                      {formik.errors.baseSalary}
                    </FormErrorMessage>
                  )}
                </InputGroup>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.daySalary && formik.errors.daySalary}
              >
                <Text ml={"30px"} mt={"16px"}>
                  Day Salary
                </Text>
                <InputGroup mt={"12px"} ml={"30px"} w={"350px"}>
                  <InputLeftElement>
                    <CiMoneyCheck1 />
                  </InputLeftElement>
                  <Input
                    placeholder="Day Amount"
                    id="daySalary"
                    name="daySalary"
                    value={formik.values.daySalary}
                    onChange={formik.handleChange}
                  ></Input>
                  {formik.touched.daySalary && formik.errors.daySalary && (
                    <FormErrorMessage>
                      {formik.errors.daySalary}
                    </FormErrorMessage>
                  )}
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" type="submit">
                {isLoading ? <Spinner /> : "Submit"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
