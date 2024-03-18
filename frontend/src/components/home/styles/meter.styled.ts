import { IMeterValue } from 'state/brand';
import styled from 'styled-components';

export const MeterWrapper = styled.div`
  height: 187px;
  width: 100%;
  position: relative;

  @media only screen and (min-width: 600px) {
    width: 100%;

    &.noData {
      width: 310px;
    }
  }
`;

export const Heading = styled.div`
  text-align: left;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: #1c1c1c;
  width: 100%;
`;

export const MeterBox = styled.div`
  margin: 0 auto;
  position: relative;
  width: 274px;

  @media only screen and (min-width: 600px) {
    margin-left: 0 auto;
  }
`;

export const MeterCanvas = styled.div<IMeterValue>`
  margin-top: 30px;
  display: -ms-flexbox;
  display: flex;
  height: 135px;
  position: relative;
  border: none;

  &::before {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    border-radius: 450px 450px 0 0;
    padding: 50px 50px 0;
    background: linear-gradient(
      ${(props): number => props.degree}deg,
      #e8e8ee ${(props): number => props.percentage}%,
      #dddddd 0%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    -webkit-mask-composite: exclude;
    -webkit-mask-composite: exclude;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const MeterNumber = styled.div`
  position: absolute;
  width: fit-content;
  font-style: normal;
  font-weight: 400;
  font-size: 13.1732px;
  line-height: 180%;
  color: #94d2bd;

  &.zero {
    left: -20px;
    bottom: -5px;
    top: auto;
    right: auto;
  }

  &.ten {
    left: -14px;
    bottom: 35px;
    top: auto;
    right: auto;
  }

  &.twenty {
    left: 3px;
    bottom: 74px;
    top: auto;
    right: auto;
  }

  &.thirty {
    left: 35px;
    bottom: auto;
    top: 12px;
    right: auto;
  }

  &.forty {
    right: auto;
    bottom: auto;
    top: -11px;
    left: 80px;
  }

  &.fifty {
    left: auto;
    bottom: auto;
    top: -20px;
    right: auto;
    width: 100%;
    text-align: center;
  }

  &.sixty {
    left: auto;
    bottom: auto;
    top: -11px;
    right: 80px;
  }

  &.seventy {
    right: 35px;
    bottom: auto;
    top: 12px;
    left: auto;
  }

  &.eighty {
    right: 3px;
    bottom: 74px;
    top: auto;
    left: auto;
  }

  &.ninty {
    right: -14px;
    bottom: 35px;
    top: auto;
    left: auto;
  }

  &.hundred {
    left: auto;
    bottom: -5px;
    top: auto;
    right: -30px;
  }
`;

export const MeterValue = styled.div`
  position: absolute;
  bottom: 0px;
  left: auto;
  right: auto;
  width: 100%;
  text-align: center;
  font-family: 'Google Sans';
  color: black;
  font-style: normal;
  font-weight: 700;
  font-size: 21.5392px;
  line-height: 120%;
`;
