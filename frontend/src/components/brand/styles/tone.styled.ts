import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

export const DropdownTag = styled(Dropdown)`
  margin: 20px 0;
  background: #fff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  max-width: 280px;
  width: 100%;
  min-height: 48px;
  color: #001219;
  border-radius: 8px;

  & .btn-success {
    border: none;
    background: transparent;
    color: #001219;
    box-shadow: none;
    line-height: 16px;
    font-weight: 400;
    padding: 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    & span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
      }
    }
  }

  &.show {
    & .btn-success.dropdown-toggle,
    & .btn-success.dropdown-toggle:focus {
      background: transparent;
      color: #001219;
      box-shadow: none;
    }
  }
  & .dropdown-toggle:not(:disabled):not(.disabled):active:focus,
  & .dropdown-toggle:not(:disabled):not(.disabled):active,
  & .dropdown-toggle:hover,
  & .dropdown-toggle:focus {
    background: transparent;
    color: #001219;
    box-shadow: none;
  }

  & .dropdown-toggle:after {
    content: none;
  }

  & .dropdown-menu {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 23.5024px 47.0049px -4.27317px rgba(159, 159, 159, 0.15);
    overflow: hidden;
  }

  & .dropdown-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 8px 16px;
    margin: 0px;
    max-height: 350px;
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    color: #001219;
    font-size: 14px;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }

  & .dropdown-item:hover,
  & .dropdown-item:focus,
  & .dropdown-item:active,
  & .dropdown-item.active {
    background: #f9f9f9;
    color: #001219;
  }
`;

export const IconDown = styled.span`
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  & img {
    max-width: 100%;
    object-fit: contain;
    pointer-events: none;
  }
`;
