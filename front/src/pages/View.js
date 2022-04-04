import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/View.css";
const View = () => {
  const [user, setUser] = useState(null);

  // View 시 User 정보 가져오게
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);
  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    if (res.status === 200) {
      setUser({ ...res.data[0] });
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user && user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user && user.email}</span>
          <br />
          <br />
          <strong>Contact: </strong>
          <span>{user && user.contact}</span>
          <br />
          <br />
          <strong>Gender: </strong>
          <span>{user && user.gender}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-view">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
