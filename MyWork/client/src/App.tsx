import { Refine, AuthProvider } from "@pankod/refine-core";
import { useState } from "react";

import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import EventNoteIcon from "@mui/icons-material/EventNote";
import Diversity3Icon from "@mui/icons-material/Diversity3";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";

import { Title, Sider, Layout, Header } from "components/layout";
import {
  LoginPage,
  StudentHome,
  TeacherHome,
  StudentRec,
  TeacherMan,
  Nodata,
} from "pages";
import { AuthPage } from "../src/pages/AuthPages";
import { SERVER_ADDRESS } from "utils/config";

// const igm = require.resolve("./data/img");
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

const resources = () => {
  let role;
  const user = localStorage.getItem("user");
  if (user) {
    role = JSON.parse(user).role;
  }

  if (role === "student") {
    return [
      {
        name: "records",

        list: StudentRec,
        create: StudentRec,
        icon: <EventNoteIcon />,
      },
    ];
  }
  if (role === "teacher") {
    return [
      {
        name: "manage",
        list: TeacherMan,
        create: TeacherMan,
        edit: TeacherMan,
        icon: <Diversity3Icon />,
      },
    ];
  }

  return [
    {
      name: "nodata",
      list: Nodata,
    },
  ];
};

const homes = () => {
  let role;
  const user = localStorage.getItem("user");
  if (user) {
    role = JSON.parse(user).role;
  }

  if (role === "student") {
    return () => StudentHome;
  }
  if (role === "teacher") {
    return () => TeacherHome;
  }

  return () => Nodata;
};

// Shawn: root
function App() {
  const [resource, setResource] = useState(resources());
  const [home, setHome] = useState(homes());

  const authProvider: AuthProvider = {
    login: async ({ data, token }) => {
      // You can handle the login process according to your needs.
      // If the process is successful.
      if (token) {
        const email = data.user.email;
        const name = data.user.name;
        const role = data.user.role;
        const photo = data.user.photo;

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            name,
            role,
            avatar: photo,
          })
        );

        setResource(resources());
        setHome(homes());

        localStorage.setItem("token", `${token}`);
        return Promise.resolve();
      }
      return Promise.reject();
    },

    register: async ({ data, token }) => {
      // You can handle the register process according to your needs.

      // If the process is successful.
      if (token) {
        const email = data.user.email;
        const name = data.user.name;
        const role = data.user.role;
        const photo = data.user.photo;

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            name,
            role,
            avatar: photo,
          })
        );

        setResource(resources());
        setHome(homes());

        localStorage.setItem("token", `${token}`);
        return Promise.resolve();
      }

      return Promise.reject();
    },
    // --
    forgotPassword: async ({ email }) => {
      // You can handle the reset password process according to your needs.

      // If process is successful.
      return Promise.resolve();

      return Promise.reject();
    },
    // --
    updatePassword: async ({ password, confirmPassword }) => {
      // You can handle the update password process according to your needs.

      // If the process is successful.
      return Promise.resolve();

      return Promise.reject();
    },

    // Google login
    // login: ({ credential }: CredentialResponse) => {
    //   const profileObj = credential ? parseJwt(credential) : null;

    //   if (profileObj) {
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({
    //         ...profileObj,
    //         avatar: profileObj.picture,
    //       })
    //     );
    //   }

    //   localStorage.setItem("token", `${credential}`);

    //   return Promise.resolve();
    // },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};

        setResource(resources());
        setHome(homes());

        // Google login token
        // window.google?.accounts.id.revoke(token, () => {
        //   return Promise.resolve();
        // });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(`${SERVER_ADDRESS}`, axiosInstance)}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={resource}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/active/:token",
                element: <AuthPage type="updatePassword" />,
              },
              {
                path: "/register",
                element: <AuthPage type="register" />,
              },
              {
                path: "/forgot-password",
                element: <AuthPage type="forgotPassword" />,
              },
              {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
              },
            ],
          }}
          authProvider={authProvider}
          LoginPage={LoginPage}
          DashboardPage={home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
