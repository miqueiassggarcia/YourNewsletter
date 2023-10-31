import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";

function StaticSizePage() {
  return (
    <div className="static-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default StaticSizePage;
