import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import Dashboard from "..";
import { ApplicationContext } from "../../../utils/context-api";

export const AppRapper = () => {
  const { isLogin } = useContext(ApplicationContext);

  if (isLogin !== true) return <Redirect to="/login" />;

  return <Route path="/dashboard" component={Dashboard} />;
};
