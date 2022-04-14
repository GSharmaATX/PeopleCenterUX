// import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import {
  API_BASE_URL,
  putRequest,
  deleteRequest,
} from "../../shared/constants";
import { transformData } from "./transform-data";
import { useGetPersonDetailByPersonNameIdAPI } from "../person-names/api-hooks";
import { useParams } from "react-router-dom";
import "./edit-person-detail.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditPersonDetail() {
  const { personId } = useParams();

  const personDetailResponse = useGetPersonDetailByPersonNameIdAPI(personId);

  if (personDetailResponse?.isLoading) return <h1> Loading..</h1>;
  else if (personDetailResponse?.isSuccess)
    return <EditPersonDetailForm personDTO={personDetailResponse.data} />;
  else return <h1> something is wrong</h1>;
}
export function EditPersonDetailForm({ personDTO }) {
  // Use the hook to get add function.
  const url = API_BASE_URL + `person/${personDTO.id}/person-detail`;
  const idToken = String(localStorage.getItem("idToken"));
  const updatePerson = useMutation((payload) =>
    putRequest(url, payload, idToken)
  );
  const deletePerson = useMutation(() => deleteRequest(url, idToken));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Result: ", data);
    console.log("Stringified Data: ", JSON.stringify(data));
    updatePerson.mutate(transformData(data));
  };

  const handleDelete = () => {
    console.log("Delete requested for id: ", personDTO.id);
    deletePerson.mutate();
  };

  return (
    <div>
      <Typography variant="h5">Person Detail</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* The next 4 fields are hidden because user don't need to see them. They are needed for the backed API to work.*/}
        <input
          type="hidden"
          defaultValue={personDTO.id}
          {...register("personId")}
        />
        <input
          type="hidden"
          defaultValue={personDTO.personNames[0].id}
          {...register("personNameId")}
        />
        <input
          type="hidden"
          defaultValue={personDTO.version}
          {...register("personVersion")}
        />
        <input
          type="hidden"
          defaultValue={personDTO.personNames[0].version}
          {...register("personNameVersion")}
        />
        <label>First Name</label>
        <input
          type="text"
          defaultValue={personDTO.personNames[0].firstName}
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
          defaultValue={personDTO.personNames[0].lastName}
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
        <input
          type="text"
          defaultValue={personDTO.personNames[0].middleName}
          {...register("middleName")}
        />
        <label htmlFor="beginDate">Effective Date</label>
        <input
          type="date"
          defaultValue={personDTO.personNames[0].beginDate}
          {...register("beginDate", { required: true })}
        />
        {errors.beginDate && (
          <div className="validation">
            <p>Effective date is required</p>
          </div>
        )}
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          defaultValue={personDTO.personNames[0].endDate}
          {...register("endDate", { required: false })}
        />
        <Divider />
        <div className="form-row">
          <label htmlFor="birthCity">Birth City</label>
          <input
            type="text"
            defaultValue={personDTO.birthCity}
            {...register("birthCity", { required: true })}
          />
          {errors.birthCity && <p>Birth city is required</p>}
          <label htmlFor="birthStateCd">Birth State</label>
          <input
            type="text"
            defaultValue={personDTO.birthStateCd}
            {...register("birthStateCd", { required: true })}
          />
          {errors.birthState && <p>Birth state is required</p>}
          <label htmlFor="birthCountryCd">Birth Country</label>
          <input
            type="text"
            defaultValue={personDTO.birthCountryCd}
            {...register("birthCountryCd", { required: true })}
          />
          {errors.birthCountryCd && <p>Birth country is required</p>}
        </div>
        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          defaultValue={personDTO.dob}
          {...register("dob", { required: true })}
        />
        {errors.dob && <p>Birth date is required</p>}
        <label htmlFor="ethnicity">Ethnicity</label>
        <input
          type="text"
          defaultValue={personDTO.ethnicity}
          {...register("ethnicity", { required: false })}
        />
        {/*    <label htmlFor="email">Email</label>
        <input
          type="text"
          defaultValue={personDTO.email}
          type="email"
          {...register("email")}
        /> */}
        <label htmlFor="eyeColorCd">Eye Color</label>
        <input
          type="text"
          defaultValue={personDTO.eyeColorCd}
          {...register("eyeColorCd", { required: false })}
        />
        <label htmlFor="Father's Name">Father's Name</label>
        <input
          type="text"
          defaultValue={personDTO.fatherName}
          {...register("fatherName", { required: true })}
        />
        {errors.fatherName && <p>Father's name is required</p>}
        <label htmlFor="motherName">Mother's Name</label>'
        <input
          type="text"
          defaultValue={personDTO.motherName}
          {...register("motherName", { required: true })}
        />
        {errors.birthState && <p>Mother's name is required</p>}
        <Box sx={{ pt: 3, display: "flex", flexDirection: "row" }}>
          <Button variant="contained" type="submit" sx={{ m: 1 }}>
            Save
          </Button>
          <Button variant="contained" onClick={handleDelete} sx={{ m: 1 }}>
            Delete
          </Button>
        </Box>
      </form>
      {(updatePerson.isLoading || deletePerson.isLoading) && (
        <p>Making request...</p>
      )}
      {(updatePerson.isSuccess || deletePerson.isSuccess) && (
        <p>Requested action was successful</p>
      )}
      {updatePerson.isError && <p>{updatePerson.error.message}</p>}
      {deletePerson.isError && <p>{deletePerson.error.message}</p>}
    </div>
  );
}
