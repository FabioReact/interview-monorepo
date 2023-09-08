import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='container mx-auto'>
      <nav>
        CodeWorks
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
