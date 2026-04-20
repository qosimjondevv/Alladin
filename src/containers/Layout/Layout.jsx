import { Topbar } from "../Topbar";
import { Footer }  from "../Footer";

export const Layout = ({ children }) => (
  <>
    <Topbar />
    {children}
    <Footer />
  </>
);