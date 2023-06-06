import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import TransactionTable from "../../Components/Tables/TransactionTable";
import GLOBALS from '../../config';

function MerchantDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    getAllTransactions();
  }, [reRender]);

  const getAllTransactions = () => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
      },
    };
    axios.get(url, config)
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.log('Api Error', error);
      });
  };

  return (
    <>
      <div>
        <Navbar user={"merchant"} reRender={reRender} setReRender={setReRender} search={search} setSearch={setSearch} />
      </div>
      <div>

      </div>
      <div>
        <Box sx={{ flexGrow: 1, mt: 12 }}>
          <Grid container spacing={2}>
            <Grid item xs={0.1}></Grid>
            <Grid item xs={11.7}>
              <TransactionTable reRender={reRender} setReRender={setReRender} setTransactions={setTransactions} transactions={transactions} />
            </Grid>
            <Grid item xs={0.1}></Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
export default MerchantDashboard;