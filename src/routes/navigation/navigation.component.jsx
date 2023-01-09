import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './navigation.styles.scss';
import logo from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
            {currentUser ? (
              <span className="nav-link" onClick={signOutUser}>
                SIGN OUT
              </span>
            ) : (
              <Link className="nav-link" to="/auth">
                Sign IN
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
