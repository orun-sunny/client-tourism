import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import useContexts from "../hooks/useContexts.js";

function AdminRoute(props) {
  const { children, ...rest } = props;
  const { email } = useContexts();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://vast-river-03162.herokuapp.com/admin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(user);
        setLoading(false);
      });
  }, [email]);
  if (loading) {
    return (
      <div className="text-center my-5 private-spinner py-2">
        <Spinner variant="primary" animation="border" role="status">
          <span className="visually-hidden">Wait here...</span>
        </Spinner>
        <h6>Loading...</h6>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.role === "admin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
