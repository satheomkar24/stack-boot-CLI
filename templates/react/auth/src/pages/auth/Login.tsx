import type { ILogin } from "../../../../base/src/types/auth";
import { authService } from "../../services/authService";
import { useAppDispatch } from "../../../../base/src/hooks/redux";
import { setAuth } from "../../../../base/src/store/authSlice";
import { storageService } from "../../../../base/src/services/storageService";
import { LoginForm } from "../../components/auth/Login";

const Register = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: ILogin) => {
    const res = await authService.login(values);
    storageService.setLocal("accessToken", res.accessToken);
    storageService.setLocal("refreshToken", res.refreshToken);
    storageService.setLocal("userData", res.user);
    dispatch(setAuth({ user: res.user }));
  };
  return <LoginForm onSubmit={handleSubmit} />;
};

export default Register;
