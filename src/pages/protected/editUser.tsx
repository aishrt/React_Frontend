import axios from "axios";
import { useEffect, useState } from "react";
import storage from "../../utils/storage";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import registermg from "../../assets/edit.jpg";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import "./protected.css";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const token = storage.getToken();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4004/user/get-profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response?.data?.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
      } else {
        console.log("An error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    address?: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4004/user/update-profile/${user?.id}`,
        data,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      );

      toast.success("Data updated successfully!");
      navigate("/user-list");
    } catch (error) {
      console.error("Error:", error);

      toast.error(`${error}`);
    }
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      {!user ? (
        <BackdropLoader open={true} />
      ) : (
        <>
          <div className="formDiv">
            <div className="">
              <div className="row">
                <div className="col-md-7 make-center">
                  <div className="imgDiv">
                    <img src={registermg} />
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
                        defaultValue={user?.first_name}
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
                        defaultValue={user?.last_name}
                        {...register("last_name", {
                          required: "Last Name is required",
                          maxLength: {
                            value: 20,
                            message:
                              "Last Name must be less than 20 characters",
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
                        disabled
                        defaultValue={user?.email}
                        variant="filled"
                      />
                    </div>

                    <div>
                      <TextField
                        id="phone_number"
                        label="Phone Number"
                        type="tel"
                        defaultValue={user?.phone_number}
                        variant="filled"
                        {...register("phone_number", {
                          required: "Phone Number is required",
                          minLength: {
                            value: 1,
                            message: "Phone Number is required",
                          },
                          maxLength: {
                            value: 12,
                            message:
                              "Phone Number must be less than 12 characters",
                          },
                        })}
                      />
                      {errors.phone_number && (
                        <p className="errorText">
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <TextField
                        id="address"
                        label="Address"
                        variant="filled"
                        defaultValue={user?.address}
                        {...register("address")}
                      />
                    </div>

                    <div className="make-center mt-5">
                      <Button variant="contained" type="submit">
                        Edit
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditUser;
