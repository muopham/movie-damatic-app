import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";

import { FormGroup, Input } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import Button from "../../components/Button/Button";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Helmet title="Register">
      <div className={cx("wrapper")}>
        <div className={cx("form")}>
          <div className={cx("form__title")}>Signup</div>
          <FormGroup>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              type="email"
              bsSize="lg"
            />
          </FormGroup>
          <FormGroup>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              type="password"
              bsSize="lg"
            />
          </FormGroup>

          <FormGroup check className={cx("remember")}>
            <div></div>
            <Link to="">Need help?</Link>
          </FormGroup>
          <Button className={cx("button")} onClick={handleSubmit}>
            Signup
          </Button>
          {error ? <p className={cx("error")}>{error}</p> : null}
          <div className={cx("description")}>
            <span>
              New to Dramatic?{" "}
              <span>
                <Link to="/login">Login now</Link>
              </span>
              .
            </span>
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <span>Learn more.</span>
            </p>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
