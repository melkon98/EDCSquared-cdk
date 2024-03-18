import styled, { keyframes } from 'styled-components';

import { PropType } from '..';

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.span<PropType>`
  border: 1.5px solid white;
  border-radius: 50%;
  border-top-color: ${(props): string => props.color || 'white'};
  border-bottom-color: ${(props): string => props.color || 'white'};
  border-right-color: ${(props): string => props.color || 'transparent'};
  opacity: 1;
  transition-delay: 200ms;
  width: 14px;
  height: 14px;
  transition: opacity 200ms;
  animation: ${rotate} 1s linear;
  animation-iteration-count: infinite;
  padding: 0px !important;
  margin-top: ${(props): string => props.sayHello || '0px'};

  @media only screen and (max-width: 420px) {
    margin-top: 0px;
  }
`;
