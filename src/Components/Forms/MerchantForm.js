import React, { useState } from "react";
import axios from "axios";
import GLOBALS from '../../config';
import { Alert } from '@mui/material';

function MerchantForm({ user, merchant, setOpen, setReRender, reRender }) {
  const [name, setName] = useState(merchant?.name);
  const [email, setEmail] = useState(merchant?.email);
  const [description, setDescription] = useState(merchant?.description);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const createMerchant = () => {
    let url = GLOBALS.BASE_URL + 'merchants';
    console.log(url);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    const postData = {
      "merchant": {
        name: name,
        email: email,
        description: description,
        status: "active",
        total_transaction_sum: 0.0,
      }
    };
    console.log(postData);
    axios
      .post(url, postData, config)
      .then((response) => {
        console.log(response);
        if (response.data.error == true) { setSuccessMsg(""); setErrorMsg(response.data.msg + '!'); }
        else {
          setSuccessMsg("Merchant Created Successfully!");
          console.log(response);
          setErrorMsg("");
          setDescription("");
          setEmail("");
          setName("");
          setReRender(!reRender);
        }
      })
      .catch((error) => {
        setSuccessMsg("");
        console.log("axios error: ", error);
        setErrorMsg("Network Error!");
      });
  }

  const updateMerchant = () => {
    let url = GLOBALS.BASE_URL + 'merchants/' + merchant?.id;
    console.log(url);
    const postData = {
      "merchant": {
        name: name,
        email: email,
        description: description,
        status: merchant.status,
        total_transaction_sum: merchant.total_transaction_sum,
      }
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
          setSuccessMsg("Merchant Updated Successfully!");
          console.log(response);
          setErrorMsg("");
          setDescription("");
          setEmail("");
          setName("");
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
    merchant ? updateMerchant() : createMerchant();
  };

  const style = {
    borderBottom: "1px dashed white",
  };

  return (
    <>
      <div style={{ zIndex: 1000 }}>
        {errorMsg != "" && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg != "" && <Alert severity="success">{successMsg}</Alert>}
        {merchant ? <h1>Update An Merchant</h1> : <h1>Create a Merchant</h1>}
        <div>
          <div className="agileits-topp">
            <form onSubmit={handleSubmit}>

              <input
                className="text"
                style={style}
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="text"
                name="Description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                className="submitBtn"
                type="submit"
                value={merchant ? "Update An Merchant" : "Create Merchant"
                }
              //disabled={type === "" ? true : false}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MerchantForm;
