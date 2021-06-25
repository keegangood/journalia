import { React, useState, useEffect } from "react";

const UserAuthForm = ({ formAction, callApi, ...props }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  // add new form changes to state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    callApi(formData);
  };

  return (
    <form className="p-2 pb-4" id="user-auth-form" onSubmit={onSubmit}>
      <div className="mb-4 form-group">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      <div className="mb-4 form-group">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </div>

      {formAction === "signup" && (
        <div className="mb-4 form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password2"
            value={formData.password2}
            onChange={onChange}
          />
        </div>
      )}

      <div className="mb-4 form-group">
        <button type="submit" className="btn btn-primary w-100" id="submit">
          Submit
        </button>
      </div>
      {formAction === "login" && (
        <div className="mt-3">
          <a
            href="#"
            className="
            mt-3 
            text-muted 
            primary-link 
            text-decoration-none 
            small"
          >
            Forgot your password?
          </a>
        </div>
      )}
    </form>
  );
};

export default UserAuthForm;
