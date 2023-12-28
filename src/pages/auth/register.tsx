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
import FileInput from "../../components/FileInput";
import { fileUpload } from "../api/fileUpload";
import { ContentLayout } from "../../layout/ContentLayout";
import { API_URL } from "../../config";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  address?: string;
  image?: string;
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

  const [file, setFile] = useState<any>();

  const handleFileChange = (file: File | null, fileDataURL: string) => {
    setFile(file);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const roleValue = checked ? "admin" : "user";
      let uploadedFile = null;

      if (file) {
        const imgResp = await fileUpload(file);
        uploadedFile = imgResp;
      }
      const response = await axios.post(
        `${API_URL}/auth/register`,
        { ...data, role: roleValue, image: uploadedFile },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const roleType = response.data.data.role === "user" ? "User" : "Admin";
      toast.success(`${roleType} registered successful!`);
      navigate("/login");
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  return (
    <ContentLayout title="Register">
      <div className="formDiv">
        <div className="formBorder registerMargin">
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
                <FileInput onFileChange={handleFileChange} />

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
                      required: "Last name is required",
                      maxLength: {
                        value: 20,
                        message: "Last name cannot exceed 20 characters",
                      },
                      minLength: {
                        value: 1,
                        message: "Last name is required",
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
                      maxLength: {
                        value: 60,
                        message: "Email cannot exceed 60 characters",
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
                    type="number"
                    variant="filled"
                    {...register("phone_number", {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Valid phone number is required",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number cannot exceed 10 digits",
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
                        message: "Password cannot exceed 99 characters",
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
                    {...register("address", {
                      required: "Address is required",
                      maxLength: {
                        value: 99,
                        message: "Address cannot exceed 99 characters",
                      },
                    })}
                  />

                  {errors.address && (
                    <p className="errorText">{errors.address.message}</p>
                  )}
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
    </ContentLayout>
  );
};
