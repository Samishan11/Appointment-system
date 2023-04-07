import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adduser,
  deleteuser,
  fetchuser,
  updateUser,
} from "../../../../redux/reducer/slice/userSlice";
import Loading from "../../component/loading";
import Sidenav from "../../component/Sidenav";
import { toast } from "react-toastify";
const Managedoctor = () => {
  const [navcollapse, setNavcollapse] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  //
  function onclick() {
    setNavcollapse(!navcollapse);
  }

  useEffect(() => {
    dispatch(fetchuser());
  }, []);

  // delete user
  const deleteUserOnClick = async (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_PROXY_URI}/delete-user/${id}`);
      dispatch(deleteuser(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // add user  from
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    isDoctor: false,
    isAdmin: false,
    phone: "",
    address: "",
    about: "",
    specialities: "",
    subspecialities: "",
    password: "",
    checkpassword: "",
  });

  const addUser = async () => {
    try {
      var res = await axios.post(
        `${import.meta.env.VITE_PROXY_URI}/register-user`,
        formData
      );
      dispatch(adduser(res.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // update user  from
  const [form, setForm] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    isAdmin: "",
    phone: "",
    address: "",
    about: "",
    specialities: "",
    subspecialities: "",
    isDoctor: "",
    checkpassword: "",
  });

  //   set data on click
  const setDataOnClick = (data) => {
    setForm({
      _id: data._id,
      username: data.username ? data.username : "",
      email: data.email ? data.email : "",
      isAdmin: data.isAdmin ? data.isAdmin : "",
      isDoctor: data.isDoctor ? data.isDoctor : "",
      password: data.password ? data.password : "",
      phone: data.phone ? data.phone : "",
      address: data.address ? data.address : "",
      about: data.about ? data.about : "",
      specialities: data.specialities ? data.specialities : "",
      subspecialities: data.subspecialities ? data.subspecialities : "",
    });
  };

  // onchange event
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // onchange event
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  // update user

  const updateUserFetch = async (e) => {
    // e.preventDefault();
    try {
      var res = await axios.put(
        `${import.meta.env.VITE_PROXY_URI}/update-user/${form._id}`,
        form
      );
      dispatch(updateUser(res.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [img, setImg] = useState("");

  // on image change
  const onImageChange = async (e, id) => {
    setImg(e.target.files[0]);
    const fd = new FormData();
    fd.append("image", e.target.files[0]);
    var res = await axios.put(
      `${import.meta.env.VITE_PROXY_URI}/update-profile/${id}`,
      fd
    );
    dispatch(updateUser(res.data.data));
  };

  return (
    <div
      className={
        navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"
      }
      id="wrapper"
    >
      {/* Sidebar */}
      <div style={{ zIndex: "999" }} className="sidenav">
        <Sidenav tab={"managedoctor"} />
      </div>
      {/* Page Content */}
      <div id="page-content-wrapper" className="bg-light">
        <nav
          style={{ zIndex: "1" }}
          className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4"
        >
          <div className="d-flex align-items-center">
            <i
              onClick={onclick}
              className="fas fa-align-left primary-text fs-4 me-3"
              id="menu-toggle"
            />
            <h2 className="fs-2 m-0">Manage Docotor</h2>
          </div>
        </nav>
        {/* Manageuser table  */}
        <div className=" mx-auto">
          <div className="container-fluid">
            <div className="col-6 col-md-4 col-lg-3">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-outline-primary my-2"
              >
                Add DOCTOR
              </button>
            </div>
            <div className="row">
              <div className="mt-5">
                <h6 className="fw-light">MANAGE DOCTOR</h6>
                {user.length === 0 ? (
                  <Loading />
                ) : (
                  <div
                    className="border rounded shadow bg-light text-secondary mt-4 px-4"
                    style={{ width: "100%", overflowX: "hidden" }}
                  >
                    <table class="table table-border">
                      <thead className="text-secondary">
                        <tr className="">
                          <th scope="col">IMAGE</th>
                          <th scope="col">USERNAME</th>
                          <th scope="col">EMAIL</th>
                          <th scope="col">JOIN</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user
                          ? user.map((data, ind) => {
                              return (
                                <tr key={ind + 1}>
                                  <input
                                    onChange={(e) => onImageChange(e, data._id)}
                                    id="img_file"
                                    className="d-none"
                                    type="file"
                                  ></input>
                                  <td className="position-relative">
                                    {data?.image?.url ? (
                                      <img
                                        onClick={() => {
                                          document
                                            .getElementById("img_file")
                                            .click();
                                        }}
                                        className="avatar_sm position-relative"
                                        src={data?.image?.url}
                                        alt="image"
                                      />
                                    ) : (
                                      <img
                                        onClick={() => {
                                          document
                                            .getElementById("img_file")
                                            .click();
                                        }}
                                        className="avatar_sm position-relative"
                                        src={
                                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbwte1tJ8o6AbmlhUPzJicUculax6L7TCHMG5i0Frw9SPevTpAfDuZLoC85zAiz27cpks&usqp=CAU"
                                        }
                                        alt="image"
                                      />
                                    )}
                                    <i
                                      style={{ right: "45%", top: "50%" }}
                                      className="fa-solid fa-camera text-primary position-absolute"
                                    ></i>
                                  </td>
                                  <td>{data.username.toUpperCase()}</td>
                                  <td>{`${data.email}`}</td>
                                  <td>
                                    {new Date(data.createdOn).toDateString()}
                                  </td>
                                  <td className="">
                                    <button
                                      onClick={() => {
                                        setDataOnClick(data);
                                      }}
                                      style={{ width: "30px" }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#updatemodal"
                                      className="btn btn-sm me-1 text-primary"
                                    >
                                      {" "}
                                      <i className="fa-solid fa-pen "></i>{" "}
                                    </button>
                                    <button
                                      onClick={() =>
                                        deleteUserOnClick(data._id)
                                      }
                                      style={{ width: "30px" }}
                                      className="btn btn-sm me-1 text-danger"
                                    >
                                      {" "}
                                      <i className="fa-solid fa-trash"></i>{" "}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          : ""}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* update modal */}
      <div
        className="modal fade"
        id="updatemodal"
        tabIndex={-1}
        aria-labelledby="updatemodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="updatemodalLabel">
                Update Appointment
              </h1>
              <button
                type="button"
                className="btn-close text-danger fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="container  pb-5">
                <div className="container bg-white d-block mx-auto">
                  <div className="row">
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input
                          onChange={(event) => onChange(event)}
                          name="username"
                          value={form?.username}
                          type="text"
                          className="form-control input100"
                          id=""
                          aria-describedby=""
                          placeholder="Enter title here"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input
                          onChange={(event) => onChange(event)}
                          name="email"
                          value={form?.email}
                          type="email"
                          className="form-control input100"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder={"Enter title here"}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Contact</label>
                        <input
                          onChange={(event) => onChange(event)}
                          name="phone"
                          value={form?.phone}
                          type="number"
                          className="form-control input100"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder={"Enter title here"}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Address</label>
                        <input
                          onChange={(event) => onChange(event)}
                          name="address"
                          value={form?.address}
                          type="text"
                          className="form-control input100"
                          id=""
                          aria-describedby=""
                          placeholder={"Enter title here"}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Admin</label>
                        <select
                          onChange={(e) => onChange(e)}
                          name="isAdmin"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>
                            {form?.isAdmin ? "True" : "False"}
                          </option>
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Doctor</label>
                        <select
                          onChange={(e) => onChange(e)}
                          name="isDoctor"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>
                            {form?.isDoctor ? "True" : "False"}
                          </option>
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="">About</label>
                        <textarea
                          onChange={(e) => onChange(e)}
                          name="about"
                          value={form?.about}
                          className="form-control"
                          aria-label=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="">Specialities</label>
                        <input
                          onChange={(e) => onChange(e)}
                          name="specialities"
                          className="form-control"
                          value={form?.specialities}
                          aria-label=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="">Subspecialities</label>
                        <textarea
                          onChange={(e) => onChange(e)}
                          name="subspecialities"
                          className="form-control"
                          value={form?.subspecialities}
                          aria-label=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={updateUserFetch}
                type="sumbit"
                className="btn btn-outline-primary"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="exampleModalLabel">
                Add User
              </h1>
              <button
                type="button"
                className="btn-close text-danger fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container  pb-5">
                <div className="container bg-white d-block mx-auto">
                  <div className="row">
                    <>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Username</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="username"
                            type="text"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter title here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="email"
                            type="email"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Contact</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="phone"
                            type="number"
                            className="form-control input100"
                            placeholder="Enter contact here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="">Address</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="address"
                            type="text"
                            className="form-control input100"
                            placeholder="Enter address here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Admin</label>
                          <select
                            onChange={(e) => handleFormChange(e)}
                            name="isAdmin"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Open this select menu</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Doctor</label>
                          <select
                            onChange={(e) => handleFormChange(e)}
                            name="isDoctor"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Open this select menu</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="">About</label>
                          <textarea
                            onChange={(e) => handleFormChange(e)}
                            name="about"
                            className="form-control"
                            aria-label=""
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="">Specialities</label>
                          <input
                            onChange={(e) => handleFormChange(e)}
                            name="specialities"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="">Subspecialities</label>
                          <textarea
                            onChange={(e) => handleFormChange(e)}
                            name="subspecialities"
                            className="form-control"
                            aria-label=""
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Password</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="password"
                            type="password"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter title here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Confirm Password
                          </label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="checkpassword"
                            type="password"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter title here"
                          />
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={addUser}
                type="sumbit"
                className="btn btn-outline-primary"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Managedoctor;
