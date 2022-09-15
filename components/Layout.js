import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ Children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{Children}</main>
      <Footer />
    </div>
  );
}
