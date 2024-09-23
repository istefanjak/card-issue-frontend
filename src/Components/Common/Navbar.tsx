import { FC } from 'react';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import NavbarButton from 'Components/Common/NavbarButton';
import NavbarHomeButton from 'Components/Common/NavbarHomeButton';

const Navbar: FC = () => {
  const ICON_SIZE = 16;

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-xl">
      <div className="flex-1">
        <NavbarHomeButton />
      </div>
      <div className="flex-none">
        <div className="menu menu-horizontal px-3 gap-2">
          <NavbarButton text="Search" path="/search" icon={<MagnifyingGlass size={ICON_SIZE} />} />
          <NavbarButton text="Insert" path="/insert" icon={<Plus size={ICON_SIZE} />} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
