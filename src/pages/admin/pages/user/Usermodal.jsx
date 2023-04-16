import React from "react";

export const UserModel = ({ handleFormChange, formData, addUser }) => {
  return (
    <div
      className="modal fade"
      id="adduserModal"
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
                          value={formData?.username}
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
                          value={formData?.email}
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
                          value={formData?.isAdmin}
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
                          value={formData?.isDoctor}
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
                          value={formData?.password}
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
                          value={formData?.checkpassword}
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
  );
};
