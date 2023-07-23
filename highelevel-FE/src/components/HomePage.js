import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);
  const [walletId, setWalletId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletName, setWalletName] = useState("");

  useEffect(() => {
    const savedWalletId = localStorage.getItem("walletId");
    console.log(localStorage.getItem("walletId"));
    if (savedWalletId) {
      setWalletId(savedWalletId);
      fetchWalletDetails(savedWalletId);
    }
  }, []);

  const fetchWalletDetails = async (id) => {
    try {
      const {
        data: { data },
      } = await axios.get(`http://localhost:9000/api/wallet/${id}`);

      setWalletBalance(data.balance);
      setWalletName(data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const initializeWallet = async () => {
    try {
      axios
        .post("http://localhost:9000/api/wallet", {
          name: userName,
          balance: parseFloat(initialBalance) || 0,
        })
        .then(({ data: { data } }) => {
          setWalletId(data.id);
          setWalletBalance(data.balance);
          setWalletName(data.name);
          localStorage.setItem("walletId", data.id);
        })
        .catch(({ response: { data } }) => {
          window.alert(data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div>
      <h1>Wallet Balance</h1>
      {walletId ? (
        <div>
          <p>Name: {walletName}</p>
          <p>Balance: {walletBalance}</p>
          <Link to="/transactions">View Transactions</Link>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Initial Balance (optional)"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
          <button onClick={initializeWallet}>setupWallet</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
