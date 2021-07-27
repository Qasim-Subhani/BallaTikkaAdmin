import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import { Alert } from "@material-ui/lab";
import firebase from "firebase";
import { ApplicationContext } from "../../utils/context-api";
import auth from "../../auth";
import { Redirect, withRouter } from "react-router-dom";

const RegistrationForm = ({ history }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  // const [isLogin, setisLogin] = useState(false);
  const { isLogin, setisLogin } = useContext(ApplicationContext);

  useEffect(() => {
    localStorage.setItem("auth", null);
  }, []);

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (email !== "" && password != "") {
      Login();
      console.log("Validations");
    } else {
      setshowAlert(true);
    }
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);
  };

  const Login = () => {
    const authenticate = firebase.auth();
    authenticate
      .signInWithEmailAndPassword(email, password)
      .then(async (data) => {
        console.log("User account created & signed in!");

        if (data.user) {
          try {
            const JsonValue = JSON.stringify(data.user);
            await localStorage.setItem("UserData", JsonValue);
            setisLogin(true);
            history.push("/dashboard");
            //   props.navigation.navigate("Itemlist", [data.user, firedata]);
          } catch (error) {
            console.log(error);
            setisLogin(false);
          }
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        // console.error(error);
        setisLogin(false);
        alert("Please Check your login Credentials");
      });
  };
  if (isLogin) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="Wrapper">
        <div>
          <h2 className="heading">Balla Tikka Shop</h2>
        </div>
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center MainContainer">
          <div>
            <form>
              <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="buttonContainer">
                <button
                  onClick={handleSubmitClick}
                  type="submit"
                  className="btn btn-primary "
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        {showAlert && (
          <Alert severity="error">
            Please Check your Credentils and Try Again
          </Alert>
        )}
      </div>
    </>
  );
};
export default withRouter(RegistrationForm);
