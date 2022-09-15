import { SITE_META } from "../lib/constants";
export default function Footer(params) {
  return (
    <footer className="site-footer">
      <p>
        Copyright &copy; {new Date().getFullYear} {SITE_META.NAME}
      </p>
    </footer>
  );
}
