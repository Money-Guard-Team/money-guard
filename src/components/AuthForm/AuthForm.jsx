import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import { Icon } from "../../Icons";
import CustomField from "../CustomField/CustomField";
import Bar from "../Bar/Bar";

import style from "./authForm.module.css";

const AuthForm = ({ type, validationSchema, initialValues, onSubmit }) => {
  const isRegister = type === "register";

  return (
    <div className={`${isRegister ? style.register : style.login} ${style.formWrapper}`}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values: { confirmPassword, password } }) => (
          <Form className={style.form}>
            <Icon id="#icon-logo_mobile" className={style.icon_mob}></Icon>
            {isRegister && (
              <CustomField type="text" name="username" placeholder="Name" />
            )}
            <CustomField type="text" name="email" placeholder="E-mail" />
            <CustomField
              type="password"
              name="password"
              placeholder="Password"
            />
            {isRegister && (
              <CustomField
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
            )}
            {isRegister && (
              <Bar password={password} confirmPassword={confirmPassword} />
            )}

            <button
              className={`${style.button_main} ${style.colored} `}
              type="submit"
            >
              {isRegister ? "Register" : "Log in"}
            </button>

            <Link to={isRegister ? "/login" : "/register"}>
              <button
                className={`${style.button_secondary} ${style.whiteButton}`}
                type="button"
              >
                {isRegister ? "Log in" : "Register"}
              </button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
