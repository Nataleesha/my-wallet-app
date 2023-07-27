import { useState } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers";

import { Container, InnerContainer, Header, Title, Form } from "./App.styled";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [signer, setSigner] = useState();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum == null) {
      setError("MetaMask is not installed. Please install it.");
    } else {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      setWalletAddress(signer.address);
      const balance = await provider.getBalance(signer.address);
      setWalletBalance(formatEth(balance));
      setError("");
    }
  };

  const handleTransfer = async ({ ether, addr }) => {
    try {
      const tx = await signer.sendTransaction({
        from: walletAddress,
        to: addr,
        value: ethers.parseEther(ether),
      });
      console.log("TX: ", tx);
    } catch (err) {
      if (err.toString().includes("-32000")) {
        setError("Insufficient funds");
      } else {
        setError("Some error occured");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (!walletAddress) {
      setError("Please connect your wallet");
      return;
    }
    setSending(true);
    await handleTransfer({
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
    setSending(false);
  };

  const formatEth = (eth) => {
    return parseFloat(formatEther(eth)).toFixed(2);
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
        <Form onSubmit={handleSubmit}>
          <input
            placeholder="Recipient Address"
            type="text"
            name="addr"
            required
            pattern="^0x[0-9,a-f,A-F]{40}$"
          />
          <input
            placeholder="Amount in ETH"
            type="text"
            name="ether"
            required
            pattern="[0-9]*\.?[0-9]*."
          />
          <button type="submit">{!sending ? "Transfer" : "Sending..."}</button>
        </Form>
        <p>{error ? error : null}</p>
      </InnerContainer>
    </Container>
  );
};

export default App;
