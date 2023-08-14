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
  Stack,
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
    baseSalary: Yup.string().required("Base Salary Required"),
    daySalary: Yup.string().required("Day Salary Required"),
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

  const calculateDaySalary = (baseSalary) => {
    if (baseSalary) {
      const numericBaseSalary = parseFloat(baseSalary.replace(/\$|,/g, ""));
      const calculatedDaySalary = (numericBaseSalary / 20).toFixed(0); // Menggunakan toFixed(0) untuk menghasilkan angka tanpa desimal
      return calculatedDaySalary;
    }
    return "";
  };

  // Fungsi untuk mengupdate daySalary saat baseSalary berubah
  const handleBaseSalaryChange = (e) => {
    const { value } = e.target;
    formik.handleChange(e); // Panggil handleChange formik untuk update input baseSalary
    const calculatedDaySalary = calculateDaySalary(value);
    formik.setFieldValue("daySalary", calculatedDaySalary);
  };
  useEffect(() => {
    dispatch(getRole());
  }, []);
  const { role } = useSelector((state) => state.AuthReducer);
  return (
    <>
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
                <Center>
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </Center>
              </FormControl>
              <Select
                {...formik.getFieldProps("roleId")}
                mt={"12px"}
                ml={"30px"}
                w={"350px"}
                placeholder="Select Role"
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
                <InputGroup mt={"12px"} ml={"30px"}>
                  <InputLeftElement>
                    <CiMoneyCheck1 />
                  </InputLeftElement>
                  <Input
                    placeholder="Amount"
                    id="baseSalary"
                    w={"350px"}
                    name="baseSalary"
                    value={formik.values.baseSalary}
                    onChange={handleBaseSalaryChange}
                  ></Input>
                </InputGroup>
                <Center>
                  {formik.touched.baseSalary && formik.errors.baseSalary && (
                    <FormErrorMessage>
                      {formik.errors.baseSalary}
                    </FormErrorMessage>
                  )}
                </Center>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.daySalary && formik.errors.daySalary}
              >
                <Text fontSize={"16px"} ml={"30px"} mt={"16px"}>
                  Day Salary
                </Text>
                <InputGroup ml={"30px"} mt={"12px"}>
                  <InputLeftElement>
                    <CiMoneyCheck1 />
                  </InputLeftElement>
                  <Input
                    placeholder="Type here"
                    id="daySalary"
                    name="daySalary"
                    w={"350px"}
                    value={formik.values.daySalary}
                    onChange={formik.handleChange}
                  ></Input>
                </InputGroup>
                <Center>
                  {formik.touched.daySalary && formik.errors.daySalary && (
                    <FormErrorMessage>
                      {formik.errors.daySalary}
                    </FormErrorMessage>
                  )}
                </Center>
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
