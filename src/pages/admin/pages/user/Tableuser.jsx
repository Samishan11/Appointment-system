import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteuser,
  fetchuser,
  updateUser,
} from "../../../../redux/reducer/slice/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
export const Tableuser = ({ items }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(fetchuser());
  }, []);
  // onchange event
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // update user  from
  const [form, setForm] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    isAdmin: "",
    isDoctor: "",
    checkpassword: "",
  });

  // update user
  const updateUserFetch = async (e) => {
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

  // delete user
  const deleteUserOnClick = async (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_PROXY_URI}/delete-user/${id}`);
      dispatch(deleteuser(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
    <>
      {items?.map((data, ind) => {
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
                    document.getElementById("img_file").click();
                  }}
                  className="avatar_sm position-relative"
                  src={data?.image?.url}
                  alt="image"
                />
              ) : (
                <img
                  onClick={() => {
                    document.getElementById("img_file").click();
                  }}
                  className="avatar_sm position-relative"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbwte1tJ8o6AbmlhUPzJicUculax6L7TCHMG5i0Frw9SPevTpAfDuZLoC85zAiz27cpks&usqp=CAU"
                  }
                  alt="image"
                />
              )}
              <i
                style={{ left: "12%", top: "50%" }}
                className="fa-solid fa-camera text-primary position-absolute"
              ></i>
            </td>
            <td>{data.username.toUpperCase()}</td>
            <td>{`${data.email}`}</td>
            <td>{new Date(data.createdOn).toDateString()}</td>
            <td className="">
              <button
                onClick={() => {
                  setForm({
                    _id: data._id,
                    username: data.username,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    isDoctor: data.isDoctor,
                    password: data.password,
                  });
                }}
                style={{ width: "30px" }}
                data-bs-toggle="modal"
                data-bs-target="#updatemodal"
                className="btn btn-sm me-1 text-primary"
              >
                <i className="fa-solid fa-pen "></i>{" "}
              </button>
              <button
                onClick={() => deleteUserOnClick(data._id)}
                style={{ width: "30px" }}
                className="btn btn-sm me-1 text-danger"
              >
                <i className="fa-solid fa-trash"></i>{" "}
              </button>
            </td>
          </tr>
        );
      })}
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
                        <label htmlFor="">Admin</label>
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
                        <label htmlFor="">Doctor</label>
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
                        <label htmlFor="">Password</label>
                        <input
                          onChange={(event) => onChange(event)}
                          name="password"
                          value={form?.password}
                          type="password"
                          className="form-control input100"
                          placeholder="Enter title here"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="form-group">
                        <label htmlFor="">Check Password</label>
                        <input
                          onChange={(event) => onChange(event)}
                          name="checkpassword"
                          value={form?.password}
                          type="password"
                          className="form-control input100"
                          placeholder="Enter title here"
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
    </>
  );
};
