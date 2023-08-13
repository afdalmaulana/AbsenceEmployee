import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/reducer/AuthReducer";

export default function ButtonLogout() {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        mt={"20px"}
        variant={"unstyled"}
        h={"20px"}
        onClick={() => dispatch(userLogout())}
        mr={"8px"}
        _hover={{ color: "red" }}
      >
        Logout
      </Button>
    </>
  );
}
