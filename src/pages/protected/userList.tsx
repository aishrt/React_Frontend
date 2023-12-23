import axios from "axios";
import { useEffect, useState } from "react";
import storage from "../../utils/storage";
import { Button, InputAdornment, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import registermg from "../../assets/edit.jpg";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import "./protected.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function UserList() {
  const token = storage.getToken();
  const [isUpdating, setUpdating] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [userList, setUserList] = useState<[]>([]);
  const [userId, setId] = useState<string>("");
  const [userDelId, setuserDelId] = useState<string>("");
  const [selectedRole, setRole] = useState("user");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: any) => {
    try {
      setSearchTerm(value);
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };

  useEffect(() => {
    getUserSearchList();
  }, [searchTerm]);
  
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleEdit = (identity: any) => {
    setId(identity);
    setShow(true);
  };
  const getUserSearchList = async () => {
    const apiUrl = `http://localhost:4004/user/list?role=${selectedRole}&name=${searchTerm}`;
    try {
      const response = await axios.get(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserList(response?.data?.data);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
      } else {
        console.log("An error occurred");
      }
    }
  };
  const getUserList = async () => {
    setLoading(true);
    let apiUrl = `http://localhost:4004/user/list?role=${selectedRole}`;

    try {
      const response = await axios.get(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserList(response?.data?.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
      } else {
        console.log("An error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserList();
    }
  }, [token, isUpdating, selectedRole]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4004/user/get-profile/${userId}`,
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
        console.log(errorMessage);
      } else {
        console.log("An error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const deleteUser = async () => {
    setLoading(true);
    setUpdating(true);
    try {
      const response = await axios.delete(
        `http://localhost:4004/user/delete-profile/${userDelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setUpdating(true);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
      } else {
        console.log("An error occurred");
      }
      setLoading(false);
      setUpdating(true);
    }
  };

  useEffect(() => {
    if (userDelId) {
      deleteUser();
    }
  }, [userDelId]);

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
    setUpdating(true);
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

      console.log("Response:", response.data);
      toast.success("Data updated successfully!");
      setUpdating(false);
      setShow(false);
    } catch (error) {
      console.error("Error:", error);
      setUpdating(false);

      toast.error(`${error}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <BackdropLoader open={true} />
      ) : (
        <>
          {show == false ? (
            <div className="container mt-3">
              <h3>All User listing.</h3>
              <div className="row TPOsbc">
                <div className="col-md-7"></div>
                <div className="col-md-3">
                  <TextField
                    id="search"
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-md-2 selectDiv">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedRole}
                      label="Select Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={"user"}>User</MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Email</StyledTableCell>
                      <StyledTableCell align="right">
                        Phone Number
                      </StyledTableCell>
                      <StyledTableCell align="right">Address</StyledTableCell>
                      <StyledTableCell align="right">Role </StyledTableCell>
                      <StyledTableCell align="right">Action </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList?.map((item: any, index: number) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="item">
                          {item.first_name} {item.last_name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.phone_number}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.address}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.role}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.role == "user" ? (
                            <div className="row">
                              <div className="col-md-6">
                                <Button
                                  className="bti"
                                  onClick={() => handleEdit(item.id)}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Button>
                              </div>
                              <div className="col-md-6">
                                <Button
                                  className="bti"
                                  onClick={() => setuserDelId(item.id)}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="bti">
                              <i className="fa-solid fa-file-shield"></i>
                            </div>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <>
              {user ? (
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
                              <p className="errorText">
                                First name is required.
                              </p>
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
                              <p className="errorText">
                                {errors.last_name.message}
                              </p>
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
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
}

export default UserList;
