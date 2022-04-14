import React, { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";

function SignInSignOut() {
  const [isSignedIn, setSignedIn] = useState(false);

  const idToken = localStorage.getItem("idToken");
  React.useEffect(() => {
    if (idToken == null) setSignedIn(false);
    else setSignedIn(true);
  }, [idToken]);

  return <div>{isSignedIn ? <Logout /> : <Login />}</div>;
}

export default SignInSignOut;
