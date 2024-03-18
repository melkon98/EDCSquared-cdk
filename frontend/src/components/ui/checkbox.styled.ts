import styled from 'styled-components';

export const CheckBoxWrapper = styled.div``;

export const CheckBoxTick = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 12px;
  width: 12px;
  background: #ffffff;
  border: 1px solid #3e3e36;
  margin-top: -1.5px;
  overflow: hidden;
  &::after {
    display: none;
    content: '';
    position: absolute;
    width: 5px;
    height: 10px;
    border: 1px solid #005f73;
    border-width: 0 2.5px 2.5px 0;
    -webkit-transform: rotate(45deg);
    left: 2.6px;
    top: -0.3px;
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &.tickMark {
    background-color: transparent;
    &::after {
      display: block;
    }
  }
`;
export const CheckBoxlabel = styled.div`
  display: block;
  position: relative;
  margin-bottom: 0px;
  margin-top: -5px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  color: #2d3748;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const CheckInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 12px;
  width: 12px;
  left: 0px;
  z-index: 2;
`;
