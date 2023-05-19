import React, { useState } from "react";
import {Button, TextField, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form inputs
    if (!name || !email || !number) {
      alert("Please enter your name and email.");
      return;
    }
    if(number.length!==10){
      alert("Enter a valid Phine number.");
      return;
    }

    // Save user details in localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    // Redirect to the second page
    navigate("/Second");
  };
  return (
    <div>
      <div className="container pt-5">
        <h1 className="mb-2">Please Fill The Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 pt-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 pt-3">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 pt-3">
            <label className="form-label" htmlFor="number">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              required
            />
          </div>
          <div className="pt-3">
            <Button type="submit" variant="contained">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
