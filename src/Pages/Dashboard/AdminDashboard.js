import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import MerchantTable from "../../Components/Tables/MerchantTable";
import GLOBALS from '../../config';
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [allMerchants, setAllMerchants] = useState([]);
  const [search, setSearch] = useState([]);
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMerchants();
  }, [reRender]);

  const getAllMerchants = () => {
    let url = GLOBALS.BASE_URL + 'merchants';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
      },
    };
    axios.get(url, config)
      .then((response) => {
        setAllMerchants(response.data.merchants);
      })
      .catch((error) => {
        console.log('Api Error', error);
      });
  };

  return (
    <>
      <div>
        <Navbar reRender={reRender} setReRender={setReRender} search={search} setSearch={setSearch} />
      </div>
      <div>
        <Box sx={{ flexGrow: 1, mt: 12 }}>
          <Grid container spacing={2}>
            <Grid item xs={0.1}></Grid>
            <Grid item xs={11.7}>
              <MerchantTable reRender={reRender} setReRender={setReRender} setAllMerchants={setAllMerchants} allMerchants={allMerchants} />
            </Grid>
            <Grid item xs={0.1}></Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default AdminDashboard;