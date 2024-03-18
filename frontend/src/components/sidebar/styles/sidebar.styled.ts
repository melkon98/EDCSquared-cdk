import styled from 'styled-components';

export const DashboardMenu = styled.ul`
  margin-top: 50px;
  li {
    &.selected {
      opacity: 1;
      &:before {
        content: '';
        display: block;
        position: absolute;
        background: url('/images/selected.svg');
        background-size: 100% 100%;
        width: 7px;
        height: 48px;
        left: -36px;
        top: 0;
      }
    }
    opacity: 0.3;
    cursor: pointer;
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    position: relative;
    span {
      display: block;
      max-height: 18px;
      opacity: 0;
      width: 0;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 140%;
    }
  }
  li:hover {
    opacity: 1;
  }
  li:hover:before {
    content: '';
    display: block;
    position: absolute;
    background-color: white;
    background: url('/images/selected.svg');
    background-size: 100% 100%;
    width: 7px;
    height: 48px;
    left: -36px;
    top: 0;
  }
  li:last-child {
    margin-bottom: 0;
  }
`;

export const DashboardSidebar = styled.div`
  transition: all 0.25s ease;
  padding: 38px 0;
  width: 98px;
  height: auto;
  min-height: 1004px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  background: #0a9396;
  border-radius: 25px;
  .brand-dashboard__avatar {
    width: 40px;
    height: 40px;
    background: #ffb444;
    border: 2px solid #ffffff;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  .brand-dashboard__avatar-wrap {
    cursor: pointer;
    margin-top: 32px;
    span {
      display: block;
      max-height: 18px;
      opacity: 0;
      width: 0;
    }
  }
  .brand-dashboard__exit {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: auto;
    gap: 14px;
    span {
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      display: none;
    }
  }
  &.opened {
    width: 282px;
    padding-left: 34px;
    padding-right: 34px;
    align-items: start;
    .brand-dashboard__menu {
      li {
        gap: 14px;
        span {
          transition: all 1.2s ease;
          width: auto;
          opacity: 1;
        }
      }
    }
    .brand-dashboard__exit {
      span {
        display: block;
      }
    }
    .brand-dashboard__avatar-wrap {
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.17);
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      .brand-dashboard__avatar {
        width: 34px;
        height: 34px;
      }
      span {
        transition: all 1.2s ease;
        width: auto;
        opacity: 1;
        display: block;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
      }
    }
  }
`;

export const SidebarWrapper = styled.div`
  display: none;
  flex-direction: column;
  flex-shrink: 0;
  height: 100vh;
  width: 0px;
  background: #ffffff;
  opacity: 0;
  z-index: 4;
  position: relative;
  pointer-events: all;
  margin: 0;
  border-right: 1px solid #9fd0bd;
  width: 179px;

  @media only screen and (min-width: 769px) {
    display: flex;
    opacity: 1;
    background: transparent;
  }

  @media only screen and (min-width: 1440px) {
    opacity: 1;
    background: transparent;
  }

  &.show {
    display: flex;
    margin: 0;
    width: 200px;
    opacity: 1;
    position: absolute;

    background: white;
    border-right: 1px solid black;
  }
`;
export const SidebarPanel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const TopHeader = styled.div`
  margin-top: 49px;
  text-align: center;
`;
export const Heading = styled.div`
  color: #005f73;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;
export const SubHeading = styled.div`
  font-size: 10px;
  line-height: 12px;
  color: #33363f;
`;
export const UnderLineCanvas = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UnderLine = styled.div`
  border-bottom: 1px solid #e5e5e5;
  width: 70px;
  height: 1px;
`;
export const ProfilePanel = styled.div`
  margin-top: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const Username = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  color: #409094;
  font-family: 'Comfortaa', cursive;
  cursor: pointer;
`;
export const Image = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  margin-top: -4px;
  display: flex;

  & img {
    max-width: 100%;
    border: 1px solid #9fd0bd;
    border-radius: 50%;
    object-fit: fill;
  }
`;
export const SidebarMenu = styled.div`
  margin-top: 60px;
  width: 100%;
`;
export const SidebarMenuItem = styled.div`
  display: flex;
  height: 30px;
  margin: 0 10px;
  align-items: center;
  justify-content: flex-start;
  color: #001219;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  &.isActive,
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-left: 5px solid #ee9b00;
  }
`;
export const SelectedLine = styled.div`
  width: 4px;
  background: transparent;
  height: 16px;
  border-radius: 8px;
`;
export const ArrowIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  display: flex;
`;
export const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 4px;
  display: flex;

  @media only screen and (min-width: 1200px) {
    margin: 0 4px;
  }

  @media only screen and (min-width: 1440px) {
    margin: 0 6px;
  }
`;
export const LogoutBtn = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  gap: 3.5px;
  color: #a1a1a1;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const CrossIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;
