/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnAuthRoutes } from 'utils';

import '../styles/login.scss';
import './style.css';

const backgroundColors = {
  '/landing': '#001219',
  '/forCreators': '#ab3a05',
  '/forBrands': '#276f6f',
  '/homePageLogin': '#001219',
  '/sayHello': '#001219',
};

export const HeaderMobile = () => {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = (): void => setShowMenu(!showMenu);

  return (
    <div className="mobile-header">
      <div className="mobile-header-top">
        <div className="header-logo">
          <img
            style={{ height: '48px', marginLeft: '-6px' }}
            src="/images/edc-squared-landing-logo.svg"
            alt="edc-squared"
          />
        </div>
        <img
          style={{ width: '32px' }}
          src="/images/burger-menu.svg"
          alt="burger-menu"
          className="responsive-menu"
          onClick={toggleMenu}
        />
      </div>
      {showMenu && (
        <div
          className="header-menu"
          style={{ background: backgroundColors[path] }}
        >
          <div className="header-menu-option-container">
            <div
              className="login-signup"
              style={path === '/homePageLogin' ? { color: 'white' } : {}}
              onClick={() => navigate(UnAuthRoutes.HomePageLogin)}
            >
              Login / Sign UP
            </div>
            <div className="header-menu-img-container">
              <div>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/edcsquared/"
                  rel="noreferrer"
                >
                  <img
                    src="/images/linkedin.png"
                    alt="linkedin-icon"
                    className="header-menu-img"
                  />
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  href="https://www.instagram.com/edcsq/"
                  rel="noreferrer"
                >
                  <img
                    src="/images/instagram.png"
                    alt="instagram-icon"
                    className="header-menu-img"
                  />
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@edcsquared"
                  rel="noreferrer"
                >
                  <img
                    src="/images/tiktok.png"
                    alt="tiktok-icon"
                    className="header-menu-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;
