import { useRoutes } from "react-router-dom";
import PersonNames from "./pages/person-names/PersonNames";
import AddPersonDetail from "./pages/add-person-detail/AddPersonDetail";
import EditPersonDetail from "./pages/edit-person-detail/EditPersonDetail";

import MainLayout from "./pages/layouts/MainLayout";
import NotFound from "./pages/not-found/NotFound";

export default function Router() {
  let element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <PersonNames /> },
        { path: "home", element: <PersonNames /> },
        { path: "new", element: <AddPersonDetail /> },
        { path: "edit/:personId", element: <EditPersonDetail /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return element;
}
