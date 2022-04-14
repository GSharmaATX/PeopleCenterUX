import { useRoutes } from "react-router-dom";
import PersonNames from "./pages/person-names/PersonNames";
import AddPersonDetail from "./pages/add-person-detail/AddPersonDetail";
import EditPersonDetail from "./pages/edit-person-detail/EditPersonDetail";
import LoginForm from "./pages/login/LoginForm";
import SignupForm from "./pages/login/SignupForm";

import MainLayout from "./pages/layouts/MainLayout";
import NotFound from "./pages/not-found/NotFound";
import PasswordResetForm from "./pages/login/PasswordResetForm";

export default function Router() {
  let element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <LoginForm /> },
        { path: "password-reset", element: <PasswordResetForm /> },
        { path: "home", element: <PersonNames /> },
        { path: "new", element: <AddPersonDetail /> },
        { path: "edit/:personId", element: <EditPersonDetail /> },
        { path: "login", element: <LoginForm /> },
        { path: "signup", element: <SignupForm /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return element;
}
