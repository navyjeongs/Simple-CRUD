import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    if (res.status === 200) {
      setData(res.data);
    }
  };

  console.log("date => ", data);

  const onDeleteUser = async (id) => {
    if (window.confirm("Are you really delete?")) {
      const res = await axios.delete(`http://localhost:5000/user/${id}`);
      if (res.status === 200) {
        toast.success(res.data);
        // 삭제하고 다시 유저 가져옴
        getUsers();
      }
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>NickName</th>
            <th style={{ textAlign: "center" }}>Gender</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.nickname}</td>
                  <td>{item.gender}</td>
                  <td>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
