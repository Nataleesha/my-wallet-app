import { useState } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers";

import { Container, InnerContainer, Header, Title, Form } from "./App.styled";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  const connectWallet = async () => {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      alert("MetaMask is not installed");
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      setWalletAddress(signer.address);
      const balance = await provider.getBalance(signer.address);
      const balanceInEth = parseFloat(formatEther(balance)).toFixed(2);
      setWalletBalance(balanceInEth);
    }
  };

  const formattedAddress = (str) => {
    const formatted = str.substr(0, 5) + "..." + str.substr(-4);
    return formatted;
  };

  return (
    <Container>
      <Header>
        <p>Logo</p>
        <div>
          <button type="button" onClick={connectWallet}>
            {!walletBalance
              ? "Connect Wallet"
              : `${walletBalance}  ${formattedAddress(walletAddress)}`}
          </button>
        </div>
      </Header>
      <InnerContainer>
        <Title>My Wallet</Title>
        <Form>
          <input placeholder="0x5083Fbc9a4004B5d7a8a10e2067499Aa687cb34C" />
          <input placeholder="0.00" />
          <button type="submit">Transfer</button>
        </Form>
      </InnerContainer>
    </Container>
  );
};

export default App;
