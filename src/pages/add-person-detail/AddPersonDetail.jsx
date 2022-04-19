import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { API_BASE_URL, postRequest } from "../../shared/constants";
import { transformData } from "./transform-data";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import "./add-person-detail.module.css";

export default function AddPersonDetail() {
  const url = API_BASE_URL + "person/person-detail";
  const idToken = String(localStorage.getItem("idToken"));
  // Use the hook to get add function.
  const addPersonNames = useMutation((payload) =>
    postRequest(url, payload, idToken)
  );
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Result: ", data);
    console.log("Stringified Data: ", JSON.stringify(data));
    const personNamesResponse = addPersonNames.mutate(transformData(data));
  };

  React.useEffect(() => {
    addPersonNames.isSuccess && navigate("/home");
    const idToken = String(localStorage.getItem("idToken"));
    if (idToken == null) navigate("/login");
  }, []);

  return (
    <div>
      <Typography variant="h5">Please enter the details</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          type="text"
          {...register("firstName", { required: true, maxLength: 80 })}
        />
        {errors.firstName && (
          <div className="validation">
            <p>First name is required</p>
          </div>
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          {...register("lastName", {
            validate: (value) => value.length > 2,
          })}
        />
        {errors.lastName && (
          <div className="validation">
            <p>Your last name is less than 3 characters</p>
          </div>
        )}
        <label htmlFor="middleName">Middle Name</label>
        <input type="text" {...register("middleName")} />
        <label htmlFor="beginDate">Effective Date</label>
        <input type="date" {...register("beginDate", { required: true })} />
        {errors.beginDate && (
          <div className="validation">
            <p>Effective date is required</p>
          </div>
        )}
        <label htmlFor="endDate">End Date</label>
        <input type="date" {...register("endDate", { required: false })} />
        <Divider />
        <div className="form-row">
          <label htmlFor="birthCity">Birth City</label>
          <input type="text" {...register("birthCity", { required: true })} />
          {errors.birthCity && <p>Birth city is required</p>}
          <label htmlFor="birthStateCd">Birth State</label>
          <input
            type="text"
            {...register("birthStateCd", { required: true })}
          />
          {errors.birthState && <p>Birth state is required</p>}
          <label htmlFor="birthCountryCd">Birth Country</label>
          <input
            type="text"
            {...register("birthCountryCd", { required: true })}
          />
          {errors.birthCountryCd && <p>Birth country is required</p>}
        </div>
        <label htmlFor="dob">Date of birth</label>
        <input type="date" {...register("dob", { required: true })} />
        {errors.dob && <p>Birth date is required</p>}
        <label htmlFor="ethnicity">Ethnicity</label>
        <input type="text" {...register("ethnicity", { required: false })} />
        {/*      <label htmlFor="email">Email</label>
        <input type="text" type="email" {...register("email")} /> */}
        <label htmlFor="eyeColorCd">Eye Color</label>
        <input type="text" {...register("eyeColorCd", { required: false })} />
        <label htmlFor="Father's Name">Father's Name</label>
        <input type="text" {...register("fatherName", { required: true })} />
        {errors.fatherName && <p>Father's name is required</p>}
        <label htmlFor="motherName">Mother's Name</label>'
        <input type="text" {...register("motherName", { required: true })} />
        {errors.birthState && <p>Mother's name is required</p>}
        <Button variant="contained" type="submit" sx={{ m: 1 }}>
          Save
        </Button>
      </form>
      {addPersonNames.isLoading && <p>Making request...</p>}
      {addPersonNames.isSuccess && <p>Record added successfully</p>}
      {addPersonNames.isError && <p>There was an error!</p>}
    </div>
  );
}
