import { Outlet } from "react-router-dom"

function AuthenticationRoot() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}

export default AuthenticationRoot;
