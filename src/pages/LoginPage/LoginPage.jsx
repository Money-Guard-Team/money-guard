import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/authOperations"; 
import css from "./LoginPage.module.css";
import { theme } from "../../styles/theme";
import { FiMail, FiLock } from "react-icons/fi";
import logo from "../../image/favicon.svg"




// Form doğrulama şeması
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export default function LoginPage() {
   const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    // Redux Thunk operasyonunu çağırıyoruz
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("Login successful");
      })
      .catch(() => {
        alert("Login failed. Please check your credentials.");
      });
    
    actions.resetForm();
  };

  return (
    <div
      className={css.wrapper}
      style={{ background: theme.colors.primary }}
    >
      <div className={css.card}>
        <div className={css.logo}>
          <img src={logo} alt="Money Guard logo" className={css.logoIcon} />
          <p>Money Guard</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => console.log(values)}
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
              <ErrorMessage name="email" component="span" className={css.error} />
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

            <button type="button" className={css.registerBtn}>
              REGISTER
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
