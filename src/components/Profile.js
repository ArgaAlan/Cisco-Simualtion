import React, { Fragment, useContext } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Context } from "../context/user/userContext";
import Loading from "./Loading";

const Profile = () => {
  const { loading, user } = useAuth0();

  const [privilege] = useContext(Context);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <p>Role: {privilege}</p>
    </Fragment>
  );
};

//<code>{JSON.stringify(user, null, 2)}</code>

export default Profile;
