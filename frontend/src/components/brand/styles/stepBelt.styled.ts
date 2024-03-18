import styled from 'styled-components';

export const StepBeltWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 45px auto 25px;

  @media only screen and (min-width: 525px) {
    width: 430px;
  }
`;
export const StepBelt = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;

  @media only screen and (min-width: 525px) {
    justify-content: center;
    width: auto;
  }
`;
export const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: #eff0f7;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 16px;
  line-height: 28px;
  color: #005f73;
  cursor: pointer;

  &.active {
    background: #409093;
    color: white;
  }
`;
export const StepBar = styled.div`
  display: none;
  width: 115px;
  height: 7px;
  background: #eff0f7;
  border-radius: 20px;
  margin: 0 21px;
  position: relative;
  border: 1px solid #409093;

  @media only screen and (min-width: 525px) {
    display: block;
  }

  & span {
    border-radius: 20px;
    background: #409093;
    position: absolute;
    width: 50%;
    height: 7px;
    &.active {
      width: 100%;
    }
  }
`;
export const StepBtnHandler = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 27px;
`;
