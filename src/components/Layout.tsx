import { FC, ReactNode } from "react";
import NavBar from "./NavBar";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen w-full space-y-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
