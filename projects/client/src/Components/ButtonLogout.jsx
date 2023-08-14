import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/reducer/AuthReducer";

export default function ButtonLogout() {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        mt={"10px"}
        bgColor={"#7C9D96"}
        onClick={() => dispatch(userLogout())}
        mr={"20px"}
        _hover={{ color: "red" }}
        // fontSize={"24px"}
      >
        Sign out
      </Button>
    </>
  );
}
