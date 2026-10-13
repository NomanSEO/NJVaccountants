import NavbarClient from "./NavbarClient";
import { NAV_LINKS } from "./navigation";

export default function Navbar() {
  return <NavbarClient links={NAV_LINKS} />;
}
