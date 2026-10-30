import { Login, register, getMe } from "../services/auth.api";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setErr } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await Login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setErr(error.response?.data?.message || "Login Failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await register({ username, email, password });
    } catch (error) {
      dispatch(setErr(error.response?.data?.message || "Registeration Fialed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setErr(error.response?.data?.message || "Data fetching Failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    getMe,
  };
}
