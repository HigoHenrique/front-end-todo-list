/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Context } from "../src/contexts/Context";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component:Component, ...rest }) => {
  const { connectedUser } = useContext(Context);
    const isAuthenticated = connectedUser.token
  
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };
  
  export default ProtectedRoute