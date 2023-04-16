import React, { useState } from "react";
import short from "short-uuid";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { add } from "../../../../redux/reducer/slice/appointmentSlice";
export default function useAddAppointment() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const transformedOptions = user.map((option) => ({
    value: option._id,
    label: option.username,
  }));
  const [selectedOption, setSelectedOption] = useState(null);

  //
  // dynamic form control
  const [inputFields, setInputFields] = useState([
    {
      title: "",
      date: "",
      time: "",
      time_end: "",
      detail: "",
      doctor: "",
    },
  ]);

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
  }
  // image hook
  const [image, setImage] = useState([]);

  // input handel event on input change
  const handleFormChangeAppointment = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    console.log(event.target.value);
    // searchDoctor(inputFields[0].doctor);
    // console.log(inputFields[0].doctor)
  };

  // loading until get response on submit form
  const [loading, setLoading] = useState(false);
  // genrate a unique short id
  const shortUUID = short();
  const uuid = uuidv4();
  const encodedUUID = shortUUID.fromUUID(uuid).slice(0, 6);
  // submit form
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (
        !inputFields[0].title ||
        !selectedOption.value ||
        !inputFields[0].date ||
        !inputFields[0].time ||
        !inputFields[0].detail ||
        !inputFields[0].time_end
      ) {
        toast.warn("Fill All The Detail");
      } else {
        const formdata = new FormData();
        formdata.append("image", image);
        formdata.append("title", inputFields[0].title);
        formdata.append("detail", inputFields[0].detail);
        formdata.append("date", inputFields[0].date);
        formdata.append("time", inputFields[0].time);
        formdata.append("time_end", inputFields[0].time_end);
        formdata.append("doctor", selectedOption.value);
        formdata.append("subspecialities", inputFields[0].subspecialities);
        formdata.append("uuid", encodedUUID);
        var response = await axios.post(
          `${import.meta.env.VITE_PROXY_URI}/appointment/add`,
          formdata
        );
        console.log(response.data);
        if (response.data.success) {
          document
            .getElementById("apointmentModal")
            .classList.remove("show", "d-block");
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.classList.remove("modal-backdrop"));
          setInputFields([
            {
              title: "",
              date: "",
              time: "",
              time_end: "",
              detail: "",
              doctor: "",
            },
          ]);
          setSelectedOption(null);
          setImage(null);
          setLoading(false);
        } else {
          setLoading(true);
        }
        dispatch(add(response.data.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return {
    inputFields,
    handleChange,
    handleFormChangeAppointment,
    loading,
    submitForm,
    transformedOptions,
    selectedOption,
    setImage,
  };
}
