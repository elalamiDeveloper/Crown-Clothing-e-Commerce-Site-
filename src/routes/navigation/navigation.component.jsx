import { Outlet, Link } from 'react-router-dom';

import logo from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} alt="crown logo" className="logo" />
        </Link>
        <ul className="links-container">
          <li className="nav-link-container">
            <Link className="nav-link" to="/shop">
              SHOP
            </Link>
          </li>
          <li className="nav-link-container">
            <Link className="nav-link" to="/sign-in">
              Sign IN
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
