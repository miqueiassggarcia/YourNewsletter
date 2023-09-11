import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="App" style={{flexDirection: "column"}}>
      {/* <h1>navbar</h1>
      <a href="singup" style={{fontSize:100, margin: "30vh"}}>singup</a> */}
      <Outlet />
      {/* <h1>footer</h1> */}
    </div>
  );
}

export default App;
