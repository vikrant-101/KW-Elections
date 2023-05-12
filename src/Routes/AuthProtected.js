import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, idToken } = useProfile();
  console.log(userProfile, loading, idToken)
  useEffect(() => {
    if (userProfile && !loading && idToken) {
      setAuthorization(idToken);
    } else if (!userProfile && loading && !idToken) {
      dispatch(logoutUser());
    }
  }, [idToken, userProfile, loading, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };