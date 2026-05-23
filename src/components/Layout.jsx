import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}