import { useState } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers";

import Loader from "./components/Loader/Loader";

import {
  Container,
  InnerContainer,
  ConnectButton,
  Header,
  Title,
  Form,
  ErrorMessage,
  Input,
  SubmitButton,
  Links,
} from "./App.styled";

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
    <>
      <Header>
        <div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5_2812)">
              <path
                d="M8.07202 16C12.4903 16 16.072 12.4183 16.072 8C16.072 3.58172 12.4903 0 8.07202 0C3.65374 0 0.0720215 3.58172 0.0720215 8C0.0720215 12.4183 3.65374 16 8.07202 16Z"
                fill="#B49FFC"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.07202 4V5.6H7.27202V7.2H4.07202V8.8H8.87202V5.6H10.472V10.4H4.07202V12H12.072V4H4.07202Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_5_2812">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.0720215)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div>
          <ConnectButton type="button" onClick={connectWallet}>
            {!walletBalance
              ? "Connect Wallet"
              : `${walletBalance}  ${formattedAddress(walletAddress)}`}
          </ConnectButton>
        </div>
      </Header>
      <Container>
        <InnerContainer>
          <Title>My Wallet</Title>
          <Form onSubmit={handleSubmit}>
            <ErrorMessage>{error ? error : null}</ErrorMessage>
            <Input
              placeholder="Recipient Address"
              type="text"
              name="addr"
              required
              pattern="^0x[0-9,a-f,A-F]{40}$"
            />
            <Input
              placeholder="Amount in ETH"
              type="text"
              name="ether"
              required
              pattern="[0-9]*\.?[0-9]*."
            />
            <SubmitButton type="submit" disabled={sending}>
              {!sending ? "Transfer" : <Loader />}
            </SubmitButton>
          </Form>
        </InnerContainer>
        <Links>
          <a
            href="https://github.com/Nataleesha/my-wallet-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inspect the code
          </a>
        </Links>
      </Container>
    </>
  );
};

export default App;
