import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'Components/Home/Home';
import Insert from 'Components/Insert/Insert';
import Search from 'Components/Search/Search';
import Account from 'Components/Account/Account';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/insert" element={<Insert />} />
      <Route path="/search" element={<Search />} />
      <Route path="/account/:oib" element={<Account />} />
    </Routes>
  );
};

export default AppRouter;
