import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

import appConfig from "../../shared/config";
import "./login-form.module.css";

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

var attributeList = [];

export default function SignupForm() {
  const navigate = useNavigate();

  const { register, formState, handleSubmit, setValue } = useForm();

  const { errors } = formState;

  const [registrationStatus, setRegistrationStatus] = useState("Initiated");

  const onSubmit = (data) => {
    if (registrationStatus === "Registered") onConfirmation(data);
    else if (registrationStatus === "Initiated") onSignup(data);
  };
  const onSignup = (signupData) => {
    // console.log("Stringified Data: ", JSON.stringify(data));

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: signupData.emailId.trim(),
    });
    var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: signupData.phoneNumber.trim(),
    });

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp(
      signupData.userName.trim(),
      signupData.password.trim(),
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
        } else {
          var cognitoUser = result.user;
          console.log("user name is " + cognitoUser.getUsername());
          setRegistrationStatus("Registered");
        }
      }
    );
  };

  const onConfirmation = (confirmationData) => {
    // console.log("Stringified Data: ", JSON.stringify(data));

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: confirmationData.userName.trim(),
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(
      confirmationData.registrationCode.trim(),
      true,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
        } else {
          console.log("User registration is confirmed. Call result: " + result);
          setRegistrationStatus("Confirmed");
          navigate("/login");
        }
      }
    );
  };

  return (
    <div>
      <Typography variant="h5">Please enter the details</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>User Name</label>
        <input
          type="text"
          readOnly={registrationStatus === "Registered"}
          {...register("userName", { required: true, maxLength: 50 })}
        />
        {errors.userName && (
          <div className="validation">
            <p>User name is required</p>
          </div>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          readOnly={registrationStatus === "Registered"}
          {...register("password", {
            validate: (value) => value.length >= 6,
          })}
        />
        {errors.password && (
          <div className="validation">
            <p>Password is less than 6 characters</p>
          </div>
        )}
        <label htmlFor="emailId">Email</label>
        <input
          type="email"
          readOnly={registrationStatus === "Registered"}
          {...register("emailId", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && (
          <div className="validation">
            <p>A valid email address is required</p>
          </div>
        )}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          readOnly={registrationStatus === "Registered"}
          {...register("phoneNumber", {})}
        />
        {errors.phoneNumber && (
          <div className="validation">
            <p>Please enter a valid phone number</p>
          </div>
        )}
        <label
          htmlFor="registrationCode"
          hidden={registrationStatus !== "Registered"}
        >
          Registration Code
        </label>
        <input
          type="text"
          hidden={registrationStatus !== "Registered"}
          {...register("registrationCode", {})}
        />
        <Button
          disabled={formState.isSubmitting}
          variant="outlined"
          type="submit"
        >
          {registrationStatus !== "Registered" ? "Signup" : "Submit"}
        </Button>
      </form>
      {registrationStatus === "Registered" && (
        <Alert severity="info">
          User registration was successful. Confirmation code has been sent to
          the registered email
        </Alert>
      )}
    </div>
  );
}
