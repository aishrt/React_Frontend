import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import "./auth.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login from "../../assets/login.jpg";

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4004/auth/login",
        data,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="formDiv">
      <div className="formBorder">
        <div className="row">
          <div className="col-md-7">
            <div className="imgDiv">
              <img src={login} />
            </div>
          </div>
          <div className="col-md-5 make-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="filled"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 1,
                    message: "Email is required",
                  },
                  maxLength: {
                    value: 60,
                    message: "Email must be less than 60 characters",
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="errorText">{errors.email.message}</p>
              )}
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="filled"
                {...register("password", {
                  required: "Password is required",
                  maxLength: {
                    value: 99,
                    message: "Password must be less than 99 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="errorText">{errors.password.message}</p>
              )}

              <div>
                <Button
                  className={clsx("mt-4")}
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="make-center mt-2">
        Dont have an account{" "}
        <span className="registerSpan" onClick={() => navigate("/register")}>
          Register here!
        </span>
        {/* <Button
          variant="outlined"
          onClick={() => navigate("/register")}
        ></Button> */}
      </div>
    </div>
  );
};
