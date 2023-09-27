import { Outlet } from "react-router-dom"

function AuthenticationRoot() {
  return (
    <div className="App" style={{flexDirection: "column"}}>
      <Outlet />
    </div>
  );
}

export default AuthenticationRoot;
