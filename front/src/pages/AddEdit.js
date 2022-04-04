import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/AddEdit.css";

const initialState = {
  name: "",
  email: "",
  contact: "",
  nickname: "",
  gender: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact, nickname, gender } = state;

  // Add가 아닌 Edit 시 Userid를 URL에서 가져온다.
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    if (res.status === 200) {
      console.log(res.data);
      setState({ ...res.data[0] });
    }
  };

  const addUser = async (data) => {
    const res = await axios.post("http://localhost:5000/user", data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const updateUser = async (data, id) => {
    const res = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const navigate = useNavigate();

  const onSubmitFunc = (e) => {
    e.preventDefault();
    console.log(state);
    if (!id) {
      addUser(state);
    } else {
      updateUser(state, id);
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const onChangeFunc = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          ailgnContent: "center",
        }}
        onSubmit={onSubmitFunc}
      >
        <h5 style={{ textAlign: "right" }}>* : is required</h5>
        <label htmlFor="name">*Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          onChange={onChangeFunc}
          value={name}
          required
        />
        <label htmlFor="email">*Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={onChangeFunc}
          value={email}
          required
        />
        <label htmlFor="contact">*Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter contact"
          onChange={onChangeFunc}
          value={contact}
          required
        />
        <label htmlFor="nickname">NickName</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="Enter nickname"
          onChange={onChangeFunc}
          value={nickname}
        />
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          onChange={onChangeFunc}
          value={gender}
        >
          <option value="none">==Select==</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
