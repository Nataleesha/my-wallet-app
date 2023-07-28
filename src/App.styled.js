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

export const ConnectButton = styled.button`
  border: none;
  font-size: 16px;
  padding: 10px 35px;
  border: 2px solid #b49ffc;
  background-color: inherit;
  border-radius: 15px;
  width: 230px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;

  &:hover,
  &:active {
    transition: 0.3s;
    box-shadow: inset 0 0 0 2em #b49ffc;
  }
`;

export const Header = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  margin-bottom: 50px;
  background-color: #14223d;
  border-radius: 15px;
`;

export const Title = styled.h2`
  margin-bottom: 40px;
  font-size: 28px;
`;

export const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 30px;
  margin-bottom: 100px;
  border-radius: 15px;
  background-color: #14223d;

  @media screen and (min-width: 768px) {
    width: 500px;
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  color: #f13c13;
  top: -22px;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 90%;
  height: 36px;
  background-color: #e2e5ee;
  border: none;
  border-radius: 6px;
  margin-bottom: 30px;
  padding-left: 10px;
`;

export const SubmitButton = styled.button`
  border: none;
  font-size: 16px;
  height: 40px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #b49ffc;
  color: #e2e5ee;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    background-color: #9a7bff;
  }

  &:active {
    box-shadow: inset 1px 1px 10px;
    transform: scale(0.98);
  }
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;

  a {
    padding: 10px 35px;
    color: #e2e5ee;
    border-radius: 15px;
    transition: all 0.3s;

    &:hover {
      color: #b49ffc;
      transition: all 0.3s;
    }
  }
`;

export const Logo = styled.img`
  display: inline-block;
  margin-right: 10px;
`;
