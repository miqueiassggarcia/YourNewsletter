import { Outlet } from "react-router-dom"

function Root() {
  return (
    <div className="App">
      <h1>navbar</h1>
      <a href="authentication/singup" style={{fontSize:100, margin: "30vh"}}>singup</a>
      <Outlet />
      <h1>footer</h1>
    </div>
  );
}

export default Root;
