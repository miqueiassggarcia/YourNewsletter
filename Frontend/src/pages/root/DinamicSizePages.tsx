import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";

function DinamicSizePage() {
  return (
    <div className="dinamic-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DinamicSizePage;
