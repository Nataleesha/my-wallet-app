import styled, { keyframes } from "styled-components";

export const Container = styled.div``;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 12px;
  height: 12px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #14223d;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
