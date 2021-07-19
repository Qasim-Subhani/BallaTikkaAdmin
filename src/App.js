import React, { useState } from "react";
import { RegistrationForm } from "./components/registration-form/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppRapper } from "./pages/dashboard/app-wrapper";
import { ApplicationContext } from "./utils/context-api/index";
import Dashboard from "./pages/dashboard";

function App() {
  const [isLogin, setisLogin] = useState(false);
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
              <Route path={"/dashboard"} exact component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </ApplicationContext.Provider>
  );
}
export default App;
