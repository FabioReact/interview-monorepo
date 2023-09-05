import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>CodeWorks</nav>
      <Outlet />
    </div>
  );
};

export default Layout;
