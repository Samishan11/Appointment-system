import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adduser } from "../../../../redux/reducer/slice/userSlice";

export default function useAddUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    isDoctor: false,
    isAdmin: false,
    password: "",
    checkpassword: "",
  });

  const dispatch = useDispatch();

  const addUser = async () => {
    try {
      var res = await axios.post(
        `${import.meta.env.VITE_PROXY_URI}/register-user`,
        formData
      );
      if (res.data.success) {
        dispatch(adduser(res.data.data));
        document.getElementById("adduserModal").classList.remove("show");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.classList.remove("modal-backdrop"));
        setFormData({
          username: "",
          email: "",
          contact: "",
          isDoctor: "",
          isAdmin: "",
          password: "",
          checkpassword: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return { formData, handleFormChange, addUser };
}
