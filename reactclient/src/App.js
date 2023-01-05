import React, { useState } from "react";
import Constants from "./utilities/Constants";
import RawTransactionForm from "./components/RawTransactionForm";
import BankTransactionForm from "./components/BankTransactionForm";
import BankTransactionUpdateForm from "./components/BankTransactionUpdateForm";
import RawTransactionUpdateForm from "./components/RawTransactionUpdateForm";

export default function App() {
  const [rawTransactions, setRawTransactions] = useState([]);
  const [bankTransactions, setBankTransactions] = useState([]);
  const [showingCreateNewRawForm, setShowingCreateNewRawForm] = useState(false);
  const [showingCreateNewBankForm, setShowingCreateNewBankForm] = useState(false);
  const [bankTransactionUpdating, setBankTransactionUpdating] = useState(null);
  const [rawTransactionUpdating, setRawTransactionUpdating] = useState(null);
  const [bankFilterAccount, setBankFilterAccount] = useState(null);
  const [rawFilterAccount, setRawFilterAccount] = useState(null);
  const [bankBalanceAccount, setBankBalanceAccount] = useState(null);
  const [bankBalance, setBankBalance] = useState(0);

  const handleBankFilterChange = (e) => {
    setBankFilterAccount({
      ...bankFilterAccount,
      [e.target.name]: e.target.value,
    });
  };

  const handleBankFilterSubmit = (e) => {
    e.preventDefault();

    getBankTransactionsFiltered(bankFilterAccount);
  };

  const handleRawFilterChange = (e) => {
    setRawFilterAccount({
      ...rawFilterAccount,
      [e.target.name]: e.target.value,
    });
  };

  const handleRawFilterSubmit = (e) => {
    e.preventDefault();

    getRawTransactionsFiltered(rawFilterAccount);
  };

  const handleBalanceChange = (e) => {
    setBankBalanceAccount({
      ...bankBalanceAccount,
      [e.target.name]: e.target.value,
    });
  };

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    // alert(bankBalanceAccount.accountNumber);
    getAccountBalance(bankBalanceAccount.accountNumber);
  }
  

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <h1>eSuper Transaction System</h1>
        <div>
            <h1 className="mt-3">Check Account Balance</h1>
            <div>
              <form onSubmit={handleBalanceSubmit}>
                  <div className="mt-4">
                    <input  name="accountNumber" className="form-control" onChange={handleBalanceChange} required placeholder="Enter Account Number"/>
                  </div>
                  <div className="mt-3 d-grid">
                      <input type="submit" value="Check Balance" className="btn btn-primary d-grid"/>    
                  </div>
              </form>       
            </div>
            <div className="table-responsive mt-5">
              <table className="table table-striped table-bordered table-sm border-dark">
                <thead>
                  <tr>
                    <th scope="col">Account Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {bankBalance}
                  </tr>
                </tbody>
              </table>
            </div>
            <h1 className="mt-3">Bank Transactions</h1>

            <div className="mt-5">
              <button onClick={getBankTransactions} className="btn btn-primary btn-lg w-100">Get Bank Transactions</button>
              <button onClick={() => setShowingCreateNewBankForm(true)} className="btn btn-info btn-lg w-100 mt-4">Create Bank Transaction</button>
            </div>
          </div>

          {(bankTransactions.length > 0 && showingCreateNewBankForm === false && bankTransactionUpdating === null ) && renderBankTable()}

          {showingCreateNewBankForm && <BankTransactionForm onBankTransactionCreated={onBankTransactionCreated}/>}

          {bankTransactionUpdating !== null && <BankTransactionUpdateForm bankTransaction = {bankTransactionUpdating} onBankTransactionUpdated = {onBankTransactionUpdated}/>}

          <div>
            <h1 className="mt-3">Raw Transactions</h1>

            <div className="mt-5">
              <button onClick={getRawTransactions} className="btn btn-dark btn-lg w-100">Get Raw Transactions</button>
              <button onClick={() => setShowingCreateNewRawForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create Raw Transaction</button>
            </div>
          </div>

          {(rawTransactions.length > 0 && showingCreateNewRawForm === false && rawTransactionUpdating === null) && renderRawTable()}

          {showingCreateNewRawForm && <RawTransactionForm onRawTransactionCreated={onRawTransactionCreated}/>}

          {rawTransactionUpdating !== null && <RawTransactionUpdateForm rawTransaction = {rawTransactionUpdating} onRawTransactionUpdated = {onRawTransactionUpdated}/>}
        </div>
      </div>
    </div>
  );

  function getRawTransactions() {
    const url = Constants.API_URL_GET_ALL_RAW_TRANSACTIONS;

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(rawTransactionsFromServer => {
      setRawTransactions(rawTransactionsFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function getBankTransactions() {
    const url = Constants.API_URL_GET_ALL_BANK_TRANSACTIONS;

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(bankTransactionsFromServer => {
      setBankTransactions(bankTransactionsFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function getBankTransactionsFiltered(accountNumberFilter) {
    const url = `${Constants.API_URL_GET_ALL_BANK_TRANSACTIONS_BY_ACCOUNTNUMBER}/${accountNumberFilter.accountNumber}`;

    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(bankTransactionsFromServer => {
      setBankTransactions(bankTransactionsFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function getRawTransactionsFiltered(accountNumberFilter) {
    const url = `${Constants.API_URL_GET_ALL_RAW_TRANSACTIONS_BY_ACCOUNTNUMBER}/${accountNumberFilter.accountNumber}`;

    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(rawTransactionsFromServer => {
      setRawTransactions(rawTransactionsFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function deleteBankTransaction(transactionID) {
    const url = `${Constants.API_URL_DELETE_BANK_TRANSACTION}/${transactionID}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => response.text())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onBankTransactionDeleted(transactionID);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function deleteRawTransaction(transactionID) {
    const url = `${Constants.API_URL_DELETE_RAW_TRANSACTION}/${transactionID}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => response.text())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onRawTransactionDeleted(transactionID);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function renderRawTable() {
    return (
      <>
      <div>
          <form onSubmit={handleRawFilterSubmit}>
              <div className="mt-4">
                <label className="h3 form-label">Filter By Account</label>
                <input  name="accountNumber" className="form-control" onChange={handleRawFilterChange} required placeholder="Enter Account Number"/>
              </div>
              <div className="mt-3 d-grid">
                  <input type="submit" value="Filter" className="btn btn-dark d-grid"/>    
              </div>
          </form>
          <div className="d-grid">
            <button onClick={getRawTransactions} className="btn btn-secondary my-3">Reset</button>
          </div>          
      </div>

      <div className="table-responsive mt-5">
        <table className="table table-striped table-bordered table-sm border-dark">
          <thead>
            <tr>
              <th scope="col">TransactionId (PK)</th>
              <th scope="col">Account Number</th>
              <th scope="col">Date</th>
              <th scope="col">Narration</th>
              <th scope="col">Amount</th>
              <th scope="col">Balance</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {rawTransactions.map((rawTransaction) => (
              <tr key={rawTransaction.transactionID}>
                <th scope="row">{rawTransaction.transactionID}</th>
                <td>{rawTransaction.accountNumber}</td>
                <td>{rawTransaction.date}</td>
                <td>{rawTransaction.narration}</td>
                <td>{rawTransaction.amount}</td>
                <td>{rawTransaction.balance}</td>
                <td>
                  <button onClick={() => setRawTransactionUpdating(rawTransaction)} className="btn btn-dark mx-3 my-3">Update</button>
                  <button onClick={() => {if(window.confirm("Are you sure you want to delete this transaction?")) deleteRawTransaction(rawTransaction.transactionID)}}className="btn btn-secondary ">Delete</button>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    )
  }

  function renderBankTable() {
      return (
        <>
        <div>
          <form onSubmit={handleBankFilterSubmit}>
              <div className="mt-4">
                <label className="h3 form-label">Filter By Account</label>
                <input  name="accountNumber" className="form-control" onChange={handleBankFilterChange} required placeholder="Enter Account Number"/>
              </div>
              <div className="mt-3 d-grid">
                  <input type="submit" value="Filter" className="btn btn-primary d-grid"/>    
              </div>
          </form>
          <div className="d-grid">
            <button onClick={getBankTransactions} className="btn btn-info my-3">Reset</button>
          </div>          
        </div>

        <div className="table-responsive mt-5">
          <table className="table table-dark table-striped table-sm table-bordered border-light">
            <thead>
              <tr>
                <th scope="col">TransactionId (PK)</th>
                <th scope="col">Account Number</th>
                <th scope="col">Date</th>
                <th scope="col">Narration</th>
                <th scope="col">Amount</th>
                <th scope="col">Balance</th>
                <th scope="col">CRUD Operations</th>
              </tr>
            </thead>
            <tbody>
              {bankTransactions.map((bankTransaction) => (
                <tr key={bankTransaction.transactionID}>
                  <th scope="row">{bankTransaction.transactionID}</th>
                  <td>{bankTransaction.accountNumber}</td>
                  <td>{bankTransaction.date}</td>
                  <td>{bankTransaction.narration}</td>
                  <td>{bankTransaction.amount}</td>
                  <td>{bankTransaction.balance}</td>
                  <td>
                    <button onClick={() => setBankTransactionUpdating(bankTransaction)} className="btn btn-primary mx-3 my-3">Update</button>
                    <button onClick={() => {if(window.confirm("Are you sure you want to delete this transaction?")) deleteBankTransaction(bankTransaction.transactionID)}}className="btn btn-info">Delete</button>
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )
  }

  function onRawTransactionCreated(createdTransaction) {
    setShowingCreateNewRawForm(false);

    if (createdTransaction === null) {
      return;
    }

    alert("Transaction Created");

    getRawTransactions();
  }

  function onBankTransactionCreated(createdTransaction) {
    setShowingCreateNewBankForm(false);
    if (createdTransaction === null) {
      return;
    }

    alert("Transaction Created");
  }

  function onBankTransactionUpdated(updatedTransaction) {
    setBankTransactionUpdating(null);

    if (updatedTransaction === null) {
      return;
    }

    let bankTransactionsCopy = [...bankTransactions];

    const index = bankTransactionsCopy.findIndex((bankTransactionsCopyTransaction, currentIndex) => {
      if (bankTransactionsCopyTransaction.transactionID === updatedTransaction.transactionID) {
        return true;
      }
    });

    if (index !== -1) {
      bankTransactionsCopy[index] = updatedTransaction;
    }

    setBankTransactions(bankTransactionsCopy);

    alert('Transaction Updated');
  }

  function onRawTransactionUpdated(updatedTransaction) {
    setRawTransactionUpdating(null);

    if (updatedTransaction === null) {
      return;
    }

    let rawTransactionCopy = [...rawTransactions];

    const index = rawTransactionCopy.findIndex((rawTransactionCopyTransaction, currentIndex) => {
      if (rawTransactionCopyTransaction.transactionID === updatedTransaction.transactionID) {
        return true;
      }
    });

    if (index !== -1) {
      rawTransactionCopy[index] = updatedTransaction;
    }

    setRawTransactions(rawTransactionCopy);

    alert('Transaction Updated')
  }

  function onBankTransactionDeleted(deletedTransactionTransactionID) {

    let bankTransactionsCopy = [...bankTransactions];

    const index = bankTransactionsCopy.findIndex((bankTransactionsCopyTransaction, currentIndex) => {
      if (bankTransactionsCopyTransaction.transactionID === deletedTransactionTransactionID) {
        return true;
      }
    });

    if (index !== -1) {
      bankTransactionsCopy.splice(index, 1);
    }

    setBankTransactions(bankTransactionsCopy);

    alert('Transaction Deleted');
  }

  function onRawTransactionDeleted(deletedTransactionTransactionID) {

    let rawTransactionsCopy = [...rawTransactions];

    const index = rawTransactionsCopy.findIndex((rawTransactionsCopyTransaction, currentIndex) => {
      if (rawTransactionsCopyTransaction.transactionID === deletedTransactionTransactionID) {
        return true;
      }
    });

    if (index !== -1) {
      rawTransactionsCopy.splice(index, 1);
    }

    setRawTransactions(rawTransactionsCopy);

    alert('Transaction Deleted');
  }

  function getAccountBalance(accountNumber) {
    const url = `${Constants.API_URL_GET_ACCOUNT_BALANCE}/${accountNumber}`;
    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(balanceFromServer => {
      setBankBalance(balanceFromServer.balance);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

}
