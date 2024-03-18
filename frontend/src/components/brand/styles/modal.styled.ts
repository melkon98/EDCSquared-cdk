import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  padding-left: 0px !important;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
  & .modal-dialog {
    max-width: 596px;
    padding: 20px;
    margin: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      height: 0px;
      width: 0px;
    }
  }
  &.vertically__top {
    & .modal-dialog {
      margin: 60px auto;
    }
  }
  &.xs__modal {
    & .modal-dialog {
      max-width: 400px;
    }
    & .modal-body {
      padding: 32px 24px;
    }
  }
  & .modal-content {
    background: #ffffff;
    border: none;
    box-shadow: none;
    border-radius: 10px;
  }
  & .modal-header {
    display: none;
  }
  & .modal-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 35px 30px 26px;
    border: none;
  }
  & .modal-footer {
    display: none;
  }
`;

export const ModalInputWrapper = styled.div`
  width: 100%;
  min-height: 210px;
  max-height: 375px;
  overflow: auto;
`;

export const CrossIcon = styled.div`
  position: absolute;
  right: 30px;
  top: 35px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 26px;
`;

export const PrimaryBtn = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  text-decoration: none;
  margin: 10px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-style: normal;
  font-weight: 400;

  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #005f73;
  padding: 14px 44px;
  width: 100px;
  background: white;
  border-radius: 4px;
  border: 1px solid #005f73;

  @media only screen and (min-width: 525px) {
    width: 168px;
  }

  &.Poppins {
  }

  &:disabled {
    background: #d2d2d2;
    opacity: 0.7;
    box-shadow: none;
    outline: none;
    text-decoration: none;
    color: #333;
    border: 1px solid #333;
  }

  &:not(:disabled):not(.disabled):active:focus,
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled):active,
  &:not(.btn-check).btn:hover,
  &.btn:focus-visible,
  &:hover,
  &:focus {
    background-color: #005f73;
    box-shadow: none;
    color: white;
    border: 1px solid #005f73;
  }
`;

export const OutlineBtn = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  text-decoration: none;
  margin: 10px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-style: normal;
  font-weight: 400;
  border: none;

  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  padding: 14px 44px;
  width: 100px;
  background: linear-gradient(180deg, #9fd0bd 0%, #409094 100%);
  border-radius: 4px;

  @media only screen and (min-width: 525px) {
    width: 168px;
  }

  &.Poppins {
  }
  &:not(:disabled):not(.disabled):active:focus,
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled):active,
  &:not(.btn-check).btn:hover,
  &.btn:focus-visible,
  &:hover,
  &:focus {
    background: linear-gradient(180deg, #77c1a4 0%, #226a6e 100%);
    box-shadow: none;
    text-decoration: none;
  }
  &:disabled {
    background: #d2d2d2;
    opacity: 0.7;
    box-shadow: none;
    outline: none;
    text-decoration: none;
    color: #333;
    border: 1px solid #333;
  }
`;

export const ModalTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #001219;
  text-align: left;
  margin: 0px 0px 25px 0px;
`;

export const LoaderCanvas = styled.div`
  position: relative;
  height: 210px;
`;

export const NoSuggestion = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  margin-top: 20px;
`;

export const SuggestionCanvas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  justify-content: center;
`;
export const SuggestionBox = styled.div`
  background: #94d2bd;
  border-radius: 10px;
  font-size: 18px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover,
  &.active {
    background: #04fba7;
  }
`;
