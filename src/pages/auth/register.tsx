import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import axios from "axios";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       "& > *": {
//         margin: theme.spacing(1),
//         width: "25ch",
//       },
//     },
//   })
// );

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  address?: string;
}

export const Register = () => {
  // const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4004/auth/register",
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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="first_name"
            {...register("first_name", { required: true })}
            label="First Name"
            variant="outlined"
          />

          {errors.first_name && (
            <p className="errorText">First name is required.</p>
          )}
        </div>

        <div>
          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
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
            variant="outlined"
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
          {errors.email && <p className="errorText">{errors.email.message}</p>}
        </div>

        <div>
          <TextField
            id="phone_number"
            label="Phone Number"
            type="tel"
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            {...register("address")}
          />
        </div>

        <div>
          <Button className={clsx("active")} variant="contained" type="submit">
            Contained
          </Button>
          {/* <Button variant="outlined" type="submit">
            Outlined
          </Button> */}
        </div>
      </form>
    </div>
  );
};
