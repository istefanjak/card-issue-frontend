import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

type NavbarButtonProps = {
  icon?: ReactElement;
  text: string;
  path: string;
};

const NavbarButton: FC<NavbarButtonProps> = ({ icon, text, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? 'btn btn-sm' : 'btn btn-sm btn-ghost')}>
      {icon}
      {text}
    </NavLink>
  );
};

export default NavbarButton;
