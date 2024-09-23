import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarHomeButton: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <div className="btn btn-ghost text-xl" onClick={onClick}>
      Card Issue
    </div>
  );
};

export default NavbarHomeButton;
