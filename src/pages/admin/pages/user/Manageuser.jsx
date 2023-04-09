import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../../component/Sidenav";
import Loading from "../../component/loading";
import { fetchuser, adduser } from "../../../../redux/reducer/slice/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../../component/pagination";

const Manageuser = () => {
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

  // add user  from
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    isDoctor: false,
    isAdmin: false,
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

  // onchange event
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const [img, setImg] = useState("");

  return (
    <div
      className={
        navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"
      }
      id="wrapper"
    >
      {/* Sidebar */}
      <div style={{ zIndex: "999" }} className="sidenav">
        <Sidenav tab={"user"} />
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
            <h2 className="fs-2 m-0">Manageuser</h2>
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
                Add User
              </button>
            </div>
            <div className="row">
              <div className="mt-5">
                <h6 className="fw-light">MANAGE USERS</h6>
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
                      <Pagination
                        items={user}
                        itemsPerPage={10}
                        pathname={"admin/user"}
                      />
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="">
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
                          <label htmlFor="">Username</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="username"
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
                            onChange={(event) => handleFormChange(event)}
                            name="email"
                            type="email"
                            className="form-control input100"
                            id=""
                            aria-describedby="emailHelp"
                            placeholder="Enter email here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="">Admin</label>
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
                          <label htmlFor="">Doctor</label>
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
                          <label htmlFor="">Password</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="password"
                            type="password"
                            className="form-control input100"
                            placeholder="Enter title here"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 my-2">
                        <div className="form-group">
                          <label htmlFor="">Confirm Password</label>
                          <input
                            onChange={(event) => handleFormChange(event)}
                            name="checkpassword"
                            type="password"
                            className="form-control input100"
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

export default Manageuser;
