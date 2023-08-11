import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuth } from "../redux/AuthReducer";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address format"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

export default function Login() {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const dispath = useDispatch();

  const showPassword = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispath(loginAuth(values, setLoading, toast));
    },
  });

  return (
    <>
      <Box fontFamily={"montserrat"}>
        <Flex>
          <Box w={"100vh"}>
            <Image src="compa.jpg"></Image>
          </Box>
          <Box
            boxShadow={"lg"}
            m={"200px auto"}
            borderRadius={"20px"}
            w={"400px"}
            h={"400px"}
            textAlign={"center"}
            bgColor={"blackAlpha.900"}
            color={"white"}
          >
            <Text fontSize={"32px"} mt={"40px"} align={"center"}>
              Sign in
            </Text>
            <Text>Welcome Back</Text>
            <form onSubmit={formik.handleSubmit}>
              <Box w={"300px"} m={"auto"}>
                <FormControl
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  <InputGroup mt={"20px"}>
                    <InputLeftElement>
                      <BsPersonCircle />
                    </InputLeftElement>
                    <Input
                      placeholder="Email"
                      isRequired={true}
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    ></Input>
                  </InputGroup>
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <InputGroup mt={"20px"}>
                    <InputLeftElement>
                      <BiSolidLockAlt />
                    </InputLeftElement>
                    <Input
                      placeholder="Password"
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    ></Input>
                    <InputRightElement>
                      <Button
                        size={"md"}
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
                              lg: "40px",
                            }}
                          />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  _hover={{ bgColor: "green" }}
                  mt={"30px"}
                  w={"300px"}
                >
                  {isLoading ? <Spinner /> : "LOGIN"}
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
