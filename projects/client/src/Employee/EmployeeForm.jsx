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
  InputRightElement,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { formEmployee } from "../redux/reducer/AuthReducer";

const formEmployeSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  username: Yup.string().required("Please complete this form").min(3),
  fullName: Yup.string().required("Please complete this form").min(3),
  birthday: Yup.date().required("Date is required"),
});

export default function EmployeeForm() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const showPassword = () => {
    setShow(!show);
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
      fullName: "",
      birthday: "",
    },
    validationSchema: formEmployeSchema,
    onSubmit: (values) => {
      console.log("submit", values);
      dispatch(formEmployee(values, setLoading, toast));
    },
  });
  return (
    <>
      <Box w={"100%"} fontFamily={"montserrat"}>
        <Box m={"20px auto"} w={"600px"}>
          <Stack textAlign={"center"}>
            <Text fontSize={"40px"}>Employee Form</Text>
            <Text>Please complete this form</Text>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Box mt={"20px"}>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"24px"}>Password</Text>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      id="password"
                      name="password"
                      ml={"185px"}
                      w={"300px"}
                      type={show ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    ></Input>
                    <InputRightElement>
                      <Button
                        size={"sm"}
                        onClick={showPassword}
                        variant={"unstyled"}
                      >
                        {show ? (
                          <AiFillEye
                            size={{
                              base: "8px",
                              sm: "12px",
                              md: "16px",
                              lg: "24px",
                            }}
                          />
                        ) : (
                          <AiFillEyeInvisible
                            size={{
                              base: "8px",
                              sm: "12px",
                              md: "16px",
                              lg: "24px",
                            }}
                          />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Center>
                    {formik.touched.password && formik.errors.password && (
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    )}
                  </Center>
                </FormControl>
              </Flex>
            </Box>
            <Box mt={"20px"}>
              <Flex justifyContent={"space-between"}>
                <Box w={"300px"}>
                  <Text fontSize={"24px"}>Full Name</Text>
                </Box>
                <FormControl
                  isInvalid={formik.touched.fullName && formik.errors.fullName}
                >
                  <Input
                    id="fullName"
                    name="fullName"
                    ml={"105px"}
                    type="text"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    placeholder="Fullname"
                    w={"300px"}
                    focusBorderColor="green.400"
                  ></Input>
                  <Center>
                    {formik.touched.fullName && formik.errors.fullName && (
                      <FormErrorMessage>
                        {formik.errors.fullName}
                      </FormErrorMessage>
                    )}
                  </Center>
                </FormControl>
              </Flex>
            </Box>
            <Box mt={"20px"}>
              <Flex justifyContent={"space-between"}>
                <Box w={"300px"}>
                  <Text fontSize={"24px"}>Username</Text>
                </Box>
                <FormControl
                  isInvalid={formik.touched.username && formik.errors.username}
                >
                  <Input
                    id="username"
                    name="username"
                    ml={"105px"}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="Username"
                    w={"300px"}
                    focusBorderColor="green.400"
                  ></Input>
                  <Center>
                    {formik.touched.username && formik.errors.username && (
                      <FormErrorMessage>
                        {formik.errors.username}
                      </FormErrorMessage>
                    )}
                  </Center>
                </FormControl>
              </Flex>
            </Box>
            <Box mt={"20px"}>
              <Flex justifyContent={"space-between"}>
                <Box w={"300px"}>
                  <Text fontSize={"24px"}>Birthday</Text>
                </Box>

                <FormControl
                  isInvalid={formik.touched.birthday && formik.errors.birthday}
                >
                  <Input
                    ml={"105px"}
                    id="birthday"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    placeholder="Select Date and Time"
                    w={"300px"}
                    type="date"
                    focusBorderColor="green.400"
                  ></Input>
                  <Center>
                    {formik.touched.birthday && formik.errors.birthday && (
                      <FormErrorMessage>
                        {formik.errors.birthday}
                      </FormErrorMessage>
                    )}
                  </Center>
                </FormControl>
              </Flex>
              <Button
                bgColor={"teal"}
                color={"white"}
                _hover={{ bgColor: "green", color: "black" }}
                mt={"20px"}
                ml={"500px"}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
