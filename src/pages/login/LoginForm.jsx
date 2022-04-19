import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

import appConfig from "../../shared/config";
import "./login-form.module.css";

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

export default function LoginForm() {
  const navigate = useNavigate();

  const { register, formState, handleSubmit, setValue } = useForm();

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Submitted data", data);
    if (data.formAction === "RESET_PASSWORD") handlePasswordReset(data);
    else if (data.formAction === "SIGNUP") navigate("/signup");
    else handleLogin(data);
  };

  const handleLogin = (data) => {
    // console.log("Stringified Data: ", JSON.stringify(data));

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: data.userName.trim(),
        Password: data.password.trim(),
      }
    );

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: data.userName.trim(),
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var idToken = result.getIdToken().getJwtToken();
        var accessToken = result.getAccessToken().getJwtToken();
        var refreshToken = result.getRefreshToken().getToken();

        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/home");
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };
  const handlePasswordReset = (data) => {
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: data.userName.trim(),
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: function () {
        navigate("/password-reset");
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div>
      <Typography variant="h5">Please enter the details</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>User Name</label>
        <input
          type="text"
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
          {...register("password", {
            validate: (value) => value.length >= 6,
          })}
        />
        {errors.password && (
          <div className="validation">
            <p>Password is less than 6 characters</p>
          </div>
        )}
        <input type="hidden" {...register("formAction", { required: false })} />
        <Stack direction="row" spacing={2} sx={{ m: 3 }}>
          <Button
            disabled={formState.isSubmitting}
            variant="text"
            type="submit"
            onClick={() => {
              setValue("formAction", "LOGIN");
            }}
          >
            Login
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Link
            component="button"
            variant="inline"
            onClick={() => {
              setValue("formAction", "RESET_PASSWORD");
            }}
          >
            Reset
          </Link>

          <Link
            component="button"
            variant="inline"
            onClick={() => {
              setValue("formAction", "SIGNUP");
            }}
          >
            Signup
          </Link>
        </Stack>
      </form>
    </div>
  );
}
