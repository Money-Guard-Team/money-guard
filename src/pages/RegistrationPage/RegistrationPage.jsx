import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import { register } from "../../redux/auth/authOperations";
import css from "./RegistrationPage.module.css";
import logo from "../../image/favicon.svg";

/* PASSWORD STRENGTH HELPER */
const getPasswordStrength = password => {
  let strength = 0;

  if (password.length >= 7) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength; // 0 - 4
};

/* VALIDATION */
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(7, "Minimum 7 characters")
    .max(12, "Maximum 12 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
  const { name, confirmPassword: _confirmPassword, ...rest } = values;


  const data = {
    username: name, 
    ...rest,
  };

  try {
    await dispatch(register(data)).unwrap();
    navigate("/dashboard");
  } catch (error) {
    alert("Registration failed");
    console.log(error);
  }

  actions.resetForm();
};

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        {/* LOGO */}
        <div className={css.logo}>
          <img src={logo} alt="Money Guard" />
          <p>Money Guard</p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            const strength = getPasswordStrength(values.password);

            return (
              <Form className={css.form}>
                {/* NAME */}
                <div className={css.fieldGroup}>
                  <FiUser className={css.icon} />
                  <Field
                    name="name"
                    placeholder="Name"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />

                {/* EMAIL */}
                <div className={css.fieldGroup}>
                  <FiMail className={css.icon} />
                  <Field
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />

                {/* PASSWORD */}
                <div className={css.fieldGroup}>
                  <FiLock className={css.icon} />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />

                {/* CONFIRM PASSWORD */}
                <div className={css.fieldGroup}>
                  <FiLock className={css.icon} />
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={css.error}
                />

                {/* PASSWORD STRENGTH BAR (CONFIRM ALTINDA) */}
                <div className={css.strengthWrapper}>
                  <div
                    className={`${css.strengthBar} ${
                      strength === 1
                        ? css.weak
                        : strength === 2
                        ? css.medium
                        : strength >= 3
                        ? css.strong
                        : " "
                    }`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>

                <button type="submit" className={css.registerBtn}>
                  REGISTER
                </button>

                <Link to="/login" className={css.loginBtn}>
                  LOG IN
                </Link>
              </Form>
            );
          }}
        </Formik>
        // test
      </div>
    </div>
  );
}
