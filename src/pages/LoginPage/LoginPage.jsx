import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/authOperations";
import css from "./LoginPage.module.css";
import { theme } from "../../styles/theme";
import { FiMail, FiLock } from "react-icons/fi";
import logo from "../../image/favicon.svg";

// Form doğrulama şeması
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(logIn(values)).unwrap();
      navigate("/dashboard/home");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.log(error);
    }
    actions.resetForm();
  };

  return (
    <div className={css.wrapper} style={{ background: theme.colors.primary }}>
      <div className={css.card}>
        <div className={css.logo}>
          <img src={logo} alt="Money Guard logo" className={css.logoIcon} />
          <p>Money Guard</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            {/* EMAIL */}
            <div className={css.fieldGroup}>
              <FiMail className={css.icon} />
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            {/* PASSWORD */}
            <div className={css.fieldGroup}>
              <FiLock className={css.icon} />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={css.input}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.loginBtn}>
              LOG IN
            </button>

            <Link to="/register" className={css.registerBtn}>
              REGISTER
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
