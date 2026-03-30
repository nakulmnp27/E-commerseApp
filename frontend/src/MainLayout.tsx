import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import type { JSX } from "react";

export default function MainLayout(): JSX.Element {
  return (
    <div className=" d-flex flex-column bg-light text-dark">
      <div className="container-fluid d-flex flex-column grow p-0">

        <Navbar />

        <main className="grow">
          <div style={{ backgroundColor: '#f5f4ef' }}>
            <Outlet />
            </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}