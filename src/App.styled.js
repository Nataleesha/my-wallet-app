import { styled } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  width: 480px;

  @media screen and (min-width: 768px) {
    width: 768px;
  }

  @media screen and (min-width: 1200px) {
    width: 1200px;
  }

  @media screen and (min-width: 1536px) {
    width: 1536px;
  }
`;

export const InnerContainer = styled.div`
  padding: 0 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  height: 100px;
  border-bottom: 1px solid darkblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.h1`
  margin-top: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid green;
  padding: 20px;
  border-radius: 10px;

  @media screen and (min-width: 768px) {
    width: 500px;
  }
`;
