import React, { useState, useEffect } from "react";
import RegistrationForm from "./components/registration-form/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppRapper } from "./pages/dashboard/app-wrapper";
import { ApplicationContext } from "./utils/context-api/index";
import Dashboard from "./pages/dashboard";
import firebase from "firebase";
import { Landing } from "./pages/dashboard/landing-page/landing";
import { AppLayout } from "./pages/app-layout/appLayout";
import { ProtectedRoutes } from "./pages/protectedRoutes/protectedRoutes";

function App() {
  const [isLogin, setisLogin] = useState(null);
  useEffect(() => {
    // app.auth().onAuthStateChanged(setisLogin);
    firebase.auth().onAuthStateChanged(setisLogin);
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        isLogin,
        setisLogin,
      }}
    >
      <Router>
        <div className="App">
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path={"/"} exact component={RegistrationForm} />
              <ProtectedRoutes
                path={"/dashboard"}
                exact
                component={Dashboard}
              />
              <Route
                path={"*"}
                exact
                component={() => <h1>404 Page Not Found</h1>}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </ApplicationContext.Provider>
  );
}
export default App;

{
  /* <Switch>
  <Route path={"/"} exact component={RegistrationForm} />
  <Route path={"/dashboard"} exact component={Dashboard} />
</Switch> */
}
