import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { Config, CognitoIdentityCredentials } from "aws-sdk";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

import appConfig from "../../shared/config";
import "./login-form.module.css";

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

export default function PasswordResetForm({ userName }) {
  const navigate = useNavigate();
  const [isConfirmed, setConfirmed] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onLoginSubmit = (data) => {
    console.log("Stringified Data: ", JSON.stringify(data));
    let awsUserName = userName == null ? data.userName.trim() : userName;
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: awsUserName,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(
      data.verificationCode.trim(),
      data.newPassword.trim(),
      {
        onSuccess() {
          console.log("Password confirmed!");
          setConfirmed(true);
        },
        onFailure(err) {
          console.log("Password not confirmed!");
          setConfirmed(false);
        },
      }
    );
  };

  React.useEffect(() => {
    /* addPersonNames.isSuccess && navigate("/home"); */
    console.log(isConfirmed);
  }, [isConfirmed]);

  return (
    <div>
      <Typography variant="h5">Please enter the details</Typography>
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        {!userName && (
          <div>
            <label>User Name</label>
            <input
              type="text"
              {...register("userName", { required: true, maxLength: 50 })}
            />
          </div>
        )}

        <label htmlFor="verificationCode">Verification Code</label>
        <input
          type="text"
          {...register("verificationCode", { required: true, maxLength: 50 })}
        />
        {errors.verificationCode && (
          <div className="validation">
            <p>Verification code is required</p>
          </div>
        )}
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          {...register("newPassword", {
            validate: (value) => value.length >= 6,
          })}
        />
        {errors.newPassword && (
          <div className="validation">
            <p>Password is less than 6 characters</p>
          </div>
        )}
        <Button variant="contained" type="submit" sx={{ m: 1 }}>
          Login
        </Button>
      </form>
      {isConfirmed && <div>Password was successfully confirmed</div>}
    </div>
  );
}
