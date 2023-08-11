import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  user: {
    id: null,
    fullName: "",
    email: "",
    username: "",
    roleId: "",
  },
  login: false,
  role: [],
};

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action", action.payload);
      const { id, fullName, email, username, roleId } = action.payload;
      state.user = { id, fullName, email, username, roleId };
    },
    userLogin: (state, action) => {
      state.login = true;
    },
    userLogout: (state, action) => {
      state.login = false;
      localStorage.removeItem("token");
    },
    setRole: (state, action) => {
      state.role = [...action.payload];
      console.log("ROLE?", action.payload);
    },
  },
});

export const loginAuth = (values, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respon = await axios.post(`${URL_API}/auth-management/auth`, {
        email: values.email,
        password: values.password,
      });
      const token = respon.data.token;
      localStorage.setItem("token", token);
      dispatch(setUser(respon.data.Account));
      dispatch(userLogin());
    } catch (error) {
      console.log("err reducer", error);
    } finally {
      setLoading(false);
    }
  };
};

export const getRole = () => {
  return async (dispatch) => {
    try {
      const respon = await axios.get(`${URL_API}/auth-management/auth/role`);
      dispatch(setRole(respon.data.account));
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const registEmployee = (values, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respon = await axios.post(
        `${URL_API}/auth-management/`,
        {
          email: values.email,
          roleId: values.roleId,
          baseSalary: values.baseSalary,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
};

export const { userLogin, setUser, setRole, userLogout } = AuthReducer.actions;
export default AuthReducer.reducer;
