import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order: descending
  const [amount, setAmount] = useState("");
  const [isCredit, setIsCredit] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10; // Number of transactions per page
  const [totalPages, setTotalPages] = useState(0);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("walletId")) navigate("/");
    fetchTransactions();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleSort = (sortByField) => {
    console.log(transactions);
    if (sortByField === "date") {
      if (sortOrder == "desc")
        setTransactions(transactions.sort((a, b) => a.date - b.date));
      else setTransactions(transactions.sort((a, b) => b.date - a.date));
    } else {
      if (sortOrder == "desc")
        setTransactions(transactions.sort((a, b) => a.amount - b.amount));
      else setTransactions(transactions.sort((a, b) => b.amount - a.amount));
    }
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setSortBy(sortByField);
  };

  const executeTransaction = async () => {
    try {
      axios
        .post(
          `http://localhost:9000/api/transaction/${localStorage.getItem(
            "walletId"
          )}`,
          {
            amount: isCredit ? parseFloat(amount) : parseFloat(amount) * -1,
            description,
          }
        )
        .then(async ({ data: { data } }) => {
          setAmount("");
          await fetchTransactions();
          setWalletBalance(data.balance);
        })
        .catch(({ response: { data } }) => {
          window.alert(data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const {
        data: {
          data: { data },
        },
      } = await axios.get(
        `http://localhost:9000/api/transaction?walletId=${localStorage.getItem(
          "walletId"
        )}&skip=${
          (currentPage - 1) * transactionsPerPage
        }&limit=${transactionsPerPage}`
      );
      console.log(data);
      const csvFormattedData = data.map((transaction) => ({
        Date: transaction.date,
        Amount: transaction.amount,
        Type: transaction.amount < 0 ? "debit" : "credit",
        Description: transaction.description,
      }));
      setCsvData(csvFormattedData);

      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Transaction Page</h1>
      <div>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isCredit}
            onChange={() => setIsCredit((prev) => !prev)}
          />
          Credit
        </label>
        <button disabled={amount <= 0} onClick={executeTransaction}>
          Submit
        </button>
      </div>
      <h2>Transactions</h2>
     { transactions.length>0 && <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("amount")}>Amount</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{+transaction.amount}</td>
              <td>{transaction.amount < 0 ? "debit" : "credit"}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>}
      {transactions.length<=0 && <h1>no transactions done yet</h1>}
      <CSVLink
        data={csvData}
        filename={"transactions.csv"}
        className="btn btn-primary"
      >
        Download CSV
      </CSVLink>
    </div>
  );
};

export default TransactionPage;
