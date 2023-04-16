import React from "react";
import Select from "react-select";
import Loading from "../../component/loading";

export const Appointmentmodal = ({
  submitForm,
  loading,
  handleFormChangeAppointment,
  inputFields,
  handleChange,
  selectedOption,
  transformedOptions,
  setImage,
}) => {
  return (
    <div
      className="modal fade"
      id="apointmentModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3" id="exampleModalLabel">
              Add Appointment
            </h1>
            <button
              type="button"
              className="btn-close text-danger fas fa-times"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            id="contact-form"
            style={{ fontSize: "1rem" }}
            className="container validate-form"
          >
            <div className="modal-body">
              <div className="container  pb-5">
                <div className="container bg-white d-block mx-auto">
                  <div className="row">
                    {inputFields.map((input, ind) => {
                      return (
                        <>
                          <div className="col-12 col-md-12 my-2">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Appointment Title
                              </label>
                              <input
                                onChange={(event) =>
                                  handleFormChangeAppointment(ind, event)
                                }
                                value={inputFields[0].title}
                                name="title"
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
                              <label htmlFor="exampleInputEmail1">
                                Doctor Name
                              </label>
                              <Select
                                value={selectedOption}
                                onChange={handleChange}
                                options={transformedOptions}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-12 my-2">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Image</label>
                              <input
                                onChange={(event) =>
                                  setImage(event.target.files[0])
                                }
                                name="image"
                                type="file"
                                className="form-control input100"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter title here"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-12 my-2">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Date</label>
                              <input
                                onChange={(event) =>
                                  handleFormChangeAppointment(ind, event)
                                }
                                name="date"
                                type="date"
                                value={inputFields[0].date}
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
                                Time Start
                              </label>
                              <input
                                onChange={(event) =>
                                  handleFormChangeAppointment(ind, event)
                                }
                                name="time"
                                type="time"
                                value={inputFields[0].time}
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
                                Time End
                              </label>
                              <input
                                onChange={(event) =>
                                  handleFormChangeAppointment(ind, event)
                                }
                                name="time_end"
                                type="time"
                                value={inputFields[0].time_end}
                                className="form-control input100"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter title here"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-12 my-2">
                            <div className="form-group">
                              <label>Description</label>
                              <textarea
                                rows={6}
                                onChange={(event) =>
                                  handleFormChangeAppointment(ind, event)
                                }
                                name="detail"
                                value={inputFields[0].detail}
                                type="text"
                                className="form-control input100"
                                placeholder="Enter description here"
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <button
                    onClick={submitForm}
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
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
