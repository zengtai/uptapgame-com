import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="my-4 grow">{children}</main>
      <Footer />
    </div>
  );
}
