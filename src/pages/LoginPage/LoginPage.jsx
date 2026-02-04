import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import AuthForm from "../../components/AuthForm/AuthForm";
import { loginThunk } from "../../redux/auth/operations";
import { loginSchema } from "../../schemas/schemas";

const initialValues = {
  password: "",
  email: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then((data) => {
        toast.success(`Welcome ${data.user.username}!`);
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });

    resetForm();
  };

  return (
    <AuthForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    />
  );
};

export default LoginPage;
