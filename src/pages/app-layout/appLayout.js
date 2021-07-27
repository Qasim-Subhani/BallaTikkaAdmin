import React from "react";
import auth from "../../auth";

export const AppLayout = (props) => {
  return (
    <div>
      <h1>App Laoyout</h1>
      <button
        onClick={() => {
          auth.logOut(() => props.history.push("/"));
        }}
      >
        Logout
      </button>
    </div>
  );
};
