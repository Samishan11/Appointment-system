import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../../component/Sidenav";
import Loading from "../../component/loading";
import { fetchuser } from "../../../../redux/reducer/slice/userSlice";
import Pagination from "../../component/pagination";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import useAddUser from "./Adduser";
import { UserModel } from "./Usermodal";

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

  const { formData, handleFormChange, addUser } = useAddUser();

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
            <div className="col-sm-6 mt-2 col-md-5 col-lg-3">
              <Fab
                size="medium"
                data-bs-toggle="modal"
                data-bs-target="#adduserModal"
                className=" my-2 mx-2"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div>
            <div className="row">
              <div className="mt-5">
                <h6 className="fw-light">MANAGE USERS</h6>
                {user.length === 0 ? (
                  <Loading />
                ) : (
                  <div
                    className="border rounded shadow bg-light text-secondary mt-4 px-4"
                    style={{ width: "100%", overflowX: "scroll" }}
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
      <UserModel
        handleFormChange={handleFormChange}
        formData={formData}
        addUser={addUser}
      />
    </div>
  );
};

export default Manageuser;
