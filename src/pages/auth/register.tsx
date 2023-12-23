import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";
import registermg from "../../assets/register.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  address?: string;
  role?: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const roleValue = checked ? "admin" : "user";
      const response = await axios.post(
        "http://localhost:4004/auth/register",
        { ...data, role: roleValue },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      );

      const roleType = response.data.data.role === "user" ? "User" : "Admin";
      toast.success(`${roleType} Registered successful!`);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <div className="formDiv">
        <div className="formBorder">
          <div className="row">
            <div className="col-md-7 make-center">
              <div className="imgDiv">
                <img src={registermg} alt="register" />
              </div>
            </div>
            <div className="col-md-5 make-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="first_name"
                    {...register("first_name", { required: true })}
                    label="First Name"
                    variant="filled"
                  />

                  {errors.first_name && (
                    <p className="errorText">First name is required.</p>
                  )}
                </div>

                <div>
                  <TextField
                    id="last_name"
                    label="Last Name"
                    variant="filled"
                    {...register("last_name", {
                      required: "Last Name is required",
                      maxLength: {
                        value: 20,
                        message: "Last Name must be less than 20 characters",
                      },
                      minLength: {
                        value: 1,
                        message: "Last Name is required",
                      },
                    })}
                  />

                  {errors.last_name && (
                    <p className="errorText">{errors.last_name.message}</p>
                  )}
                </div>

                <div>
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
                </div>

                <div>
                  <TextField
                    id="phone_number"
                    label="Phone Number"
                    type="tel"
                    variant="filled"
                    {...register("phone_number", {
                      required: "Phone Number is required",
                      minLength: {
                        value: 1,
                        message: "Phone Number is required",
                      },
                      maxLength: {
                        value: 12,
                        message: "Phone Number must be less than 12 characters",
                      },
                    })}
                  />
                  {errors.phone_number && (
                    <p className="errorText">{errors.phone_number.message}</p>
                  )}
                </div>

                <div>
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
                </div>

                <div>
                  <TextField
                    id="address"
                    label="Address"
                    variant="filled"
                    {...register("address")}
                  />
                </div>

                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label="Want to register as Admin"
                />

                <div className="make-center">
                  <Button
                    className={clsx("mt-4")}
                    variant="contained"
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
