import NavbarClient from "./NavbarClient";
import { navLinksWithServices } from "./navigation";
import { getServices } from "@/sanity/lib/queries";

export default async function Navbar() {
  const services = await getServices();
  return <NavbarClient links={navLinksWithServices(services)} />;
}
