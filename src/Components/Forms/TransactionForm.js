import React, { useState } from "react";
import axios from "axios";
import GLOBALS from '../../config';
import { Alert } from '@mui/material';

function TransactionForm({ user, transaction, setOpen, setReRender, reRender }) {
  const [amount, setAmount] = useState(transaction?.amount);
  const [customer_email, setCustomerEmail] = useState(transaction?.customer_email);
  const [customer_phone, setCustomerPhone] = useState(transaction?.customer_phone);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const createTransaction = () => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions';
    console.log(url);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
      },
    };
    const postData = {
      "transaction": {
        amount: amount,
        status: "approved",
        customer_email: customer_email,
        customer_phone: customer_phone
      },
    };
    axios
      .post(url, postData, config)
      .then((response) => {
        console.log(response);
        if (response.data.error == true) { setSuccessMsg(""); setErrorMsg(response.data.msg + '!'); }
        else {
          setSuccessMsg("Transaction Created Successfully!");
          console.log(response);
          setErrorMsg("");
          setAmount("");
          setCustomerEmail("");
          setCustomerPhone("");
          setReRender(!reRender);
        }
      })
      .catch((error) => {
        setSuccessMsg("");
        console.log("axios error: ", error);
        setErrorMsg("Network Error!");
      });
  }

  const updateTransaction = () => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions/' + transaction.id;
    console.log(url);
    const postData = {
      "transaction": {
        amount: amount,
        status: "approved",
        customer_email: customer_email,
        customer_phone: customer_phone,
        type: transaction.type,
      },
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
      },
    }
    console.log(postData);
    axios
      .put(url, postData, config)
      .then((response) => {
        console.log(response);
        if (response.data.error == true) { setSuccessMsg(""); setErrorMsg(response.data.msg + '!'); }
        else {
          setSuccessMsg("Transaction Updated Successfully!");
          console.log(response);
          setErrorMsg("");
          setAmount("");
          setCustomerEmail("");
          setCustomerPhone("");
          setReRender(!reRender);
        }
      })
      .catch((error) => {
        setSuccessMsg("");
        console.log("axios error: ", error);
        setErrorMsg("Network Error!");
      });
  }

  const handleSubmit = (curent_event) => {
    curent_event.preventDefault();
    transaction ? updateTransaction() : createTransaction();
  };

  const style = {
    borderBottom: "1px dashed white",
  };

  return (
    <>
      <div style={{ zIndex: 1000 }}>
        {errorMsg != "" && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg != "" && <Alert severity="success">{successMsg}</Alert>}
        {transaction ? <h1>Update An Transaction</h1> : <h1>Create a Transaction</h1>}
        <div>
          <div className="agileits-topp">
            <form onSubmit={handleSubmit}>
              <input
                className="text"
                style={style}
                type="text"
                name="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="email"
                name="customer_email"
                placeholder="Customer Email"
                value={customer_email}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="text"
                name="customer_phone"
                placeholder="Customer Phone"
                value={customer_phone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
              <input
                className="submitBtn"
                type="submit"
                value={transaction ? "Update An Transaction" : "Create Transaction"
                }
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionForm;