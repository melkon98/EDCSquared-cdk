import styled from 'styled-components';

export const ToastContainer = styled.div`
  .toast {
    pointer-events: initial;
    display: block !importatnt;
    opacity: 1 !important;
    max-width: 480px;
    min-width: 360px;
    padding: 15px 40px 15px 20px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    margin-top: 10px;
    &:before {
      content: '"';
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      background-color: #3f73f6;
      width: 3px;
      text-indent: -50px;
    }
  }
  .toast-header {
    border-bottom: 0;
    padding: 0 0 4px;
    color: #222;
    font-size: 14px;
    button.close {
      position: absolute;
      right: 18px;
      top: 12px;
      margin-bottom: 0 !important;
      font-size: 1.75rem;
      opacity: 0.3;
    }
  }
  .toast-body {
    font-size: 14px;
    color: #979393;
    padding: 0;
    text-align: left;
  }

  @media (max-width: 575px) {
    right: 20px;
    bottom: 20px;
    left: 20px;
    .toast {
      min-width: 10px;
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const TextContainer = styled.strong`
  margin-right: auto;
`;

export const MainToastCover = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  max-height: 50vh;
  z-index: 999;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 575px) {
    height: auto;
    right: 0;
    left: 0;
  }
`;

export const MainToast = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
