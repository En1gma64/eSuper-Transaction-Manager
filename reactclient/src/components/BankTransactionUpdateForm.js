import React, {useState} from "react";
import Constants from "../utilities/Constants";

export default function BankTransactionUpdateForm(props) {
    const initialFormData = Object.freeze({
        transactionID: props.bankTransaction.transactionID,
        accountNumber: props.bankTransaction.accountNumber,
        date: props.bankTransaction.date,
        narration: props.bankTransaction.narration,
        amount: props.bankTransaction.amount,
        balance: props.bankTransaction.balance
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionToUpdate = {
            transactionID: formData.transactionID,
            accountNumber: formData.accountNumber,
            date: formData.date,
            narration: formData.narration,
            amount: formData.amount,
            balance: formData.balance
        };

        const url = Constants.API_URL_UPDATE_BANK_TRANSACTION;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionToUpdate)
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });

        props.onBankTransactionUpdated(transactionToUpdate);
    };

    return (
        <div>
            <form className="w-100 px-5" onSubmit={handleSubmit}>
                <h1 className="mt-5">Update New Bank Transaction: {props.bankTransaction.transactionID}.</h1>

                <div className="mt-4">
                    <label className="h3 form-label">Transaction ID</label>
                    <input value={formData.transactionID} name="transactionID" className="form-control" onChange={handleChange} required placeholder="Enter Transaction Number"/>
                </div>

                <div className="mt-4">
                    <label className="h3 form-label">Account Number</label>
                    <input value={formData.accountNumber} name="accountNumber" className="form-control" onChange={handleChange} required placeholder="Enter Account Number"/>
                </div>

                <div className="mt-4">
                    <label className="h3 form-label">Date</label>
                    <input value={formData.date} name="date" className="form-control" onChange={handleChange} required placeholder="dd/mm/yyyy"/>
                </div>

                <div className="mt-4">
                    <label className="h3 form-label">Narration</label>
                    <input value={formData.narration} name="narration" className="form-control" onChange={handleChange} required placeholder="Enter Narration"/>
                </div>

                <div className="mt-3">
                    <label className="h3 form-label">Amount</label>
                    <input value={formData.amount} name="amount" className="form-control" onChange={handleChange} required placeholder="Enter Amount"/>
                </div>

                <div className="mt-3">
                    <label className="h3 form-label">Balance</label>
                    <input value={formData.balance} name="balance" className="form-control" onChange={handleChange} required placeholder="Enter Balance"/>
                </div>
                
                <div className="mt-3">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                    <button onClick={() => props.onBankTransactionUpdated(null)} className="mx-2 btn btn-info">Cancel</button>
                </div>
            </form>
        </div>
    )
}