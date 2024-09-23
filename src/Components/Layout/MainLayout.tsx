import { FC } from 'react';
import Navbar from 'Components/Common/Navbar';
import { Toaster } from 'react-hot-toast';
import AppRouter from 'AppRouter';

const MainLayout: FC = () => {
  return (
    <div className="bg-base-200 h-screen">
      <div>
        <Toaster position="top-right" />
      </div>
      <Navbar />
      <div className="py-10 px-5 flex justify-around">
        <AppRouter />
      </div>
    </div>
  );
};

export default MainLayout;
