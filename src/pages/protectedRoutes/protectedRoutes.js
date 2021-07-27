import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationContext } from "../../utils/context-api";

export const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const { isLogin, setisLogin } = useContext(ApplicationContext);
  console.log("isLog inn", isLogin);
  return (
    <Route
      {...rest}
      render={(prop) => {
        if (isLogin) {
          return <Component {...prop} />;
        } else {
          <Redirect to={{ pathname: "/", state: { from: prop.location } }} />;
        }
      }}
    />
  );
};
