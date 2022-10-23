import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="grow my-4">{children}</main>
      <Footer />
    </div>
  );
}
