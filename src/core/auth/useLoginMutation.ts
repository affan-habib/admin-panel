import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../config";
import { UserType } from "../../types";
import { login } from "../../store/reducers/authSlice";

interface Authorization {
  token: string;
  type: string;
}

interface LoginResponse {
  status: string;
  user: UserType;
  authorisation: Authorization;
}

interface LoginData {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation(
    (data: LoginData) =>
      axios
        .post(`${apiBaseUrl}/admin-login`, data)
        .then((response) => response.data),
    {
      onSuccess: (data: LoginResponse) => {
        dispatch(login({ email: data.user.email }));
        localStorage.setItem("token", data.authorisation.token);
        navigate("/");
      },
    }
  );
};
