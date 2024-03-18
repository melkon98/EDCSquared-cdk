import { Link } from 'react-router-dom';
import { UnAuthRoutes } from 'utils';

import '../styles/login.scss';

export const HeaderDesktop = () => {
  const path = window.location.pathname;

  return (
    <div className="login__top">
      <div className="header-logo">
        <img
          style={{ height: '72px', width: '190px' }}
          src="/images/edc-squared-landing-logo.svg"
          alt="edc-squared"
        />
      </div>
      <ul className="list-none header-list">
        <li>
          <Link
            className={`${path === '/landing' ? 'active' : ''} default-link`}
            to={'/landing'}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            className={`${
              path === '/forCreators' ? 'active' : ''
            } default-link`}
            to={'/forCreators'}
          >
            FOR CREATORS
          </Link>
        </li>
        <li>
          <Link
            className={`${path === '/forBrands' ? 'active' : ''} default-link`}
            to={'/forBrands'}
          >
            FOR BRANDS
          </Link>
        </li>
        <li>
          <Link
            className={`${path === '/sayHello' ? 'active' : ''} default-link`}
            to={'/sayHello'}
          >
            Say hello
          </Link>
        </li>
        <div className="social-links">
          <li>
            <a
              target="_blank"
              href="https://www.tiktok.com/@edcsquared"
              rel="noreferrer"
            >
              <img width={28} height={28} src="images/tiktok.png" alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/edcsquared/"
              rel="noreferrer"
            >
              <img width={28} height={28} src="images/linkedin.png" alt="" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/edcsq/"
              rel="noreferrer"
            >
              <img width={28} height={28} src="images/instagram.png" alt="" />
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default HeaderDesktop;
