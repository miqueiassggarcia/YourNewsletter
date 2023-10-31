import { Outlet } from "react-router-dom"

export function AuthenticationRoot() {
  return (
    <div className="static-container">
      <Outlet />
    </div>
  );
}
