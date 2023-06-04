import React, { useEffect, useState } from "react";
import FeedCard from "../../Components/FeedCard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import MerchantTable from "../../Components/MerchantTable";
import TransactionTable from "../../Components/TransactionTable";
function MerchantDashboard() {
  const [allEvents, setAllEvents] = useState([
    {
      "_id": "647b0d073d3925758787fb6f",
      "title": "Voluptates provident",
      "description": "Fuga Ex qui duis la",
      "date": "2023-06-03",
      "venue": "Aut autem perspiciat",
      "type": "Meeting",
      "owner": {
        "events_favorite": [],
        "_id": "647afca406eb5de2d83c246d",
        "name": "asdfd",
        "email": "jelykaw@mailinator.com",
        "password": "123456",
        "events_joined": [],
        "__v": 0
      },
      "participants": [],
      "date_created": "2023-06-03T09:51:03.337Z",
      "__v": 0
    }
  ]);

  const [search, setSearch] = useState([]);
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    // getAllEvents();
  }, [reRender]);

  const getAllEvents = () => {
    axios
      .get("http://127.0.0.1:5000/api/event-list", {})
      .then((response) => {
        setAllEvents(response.data.events);
      })
      .catch((error) => {
        // console.error("dddddddddddd", error.response.data.message);
      });
  };
  return (
    <>
      <div>
        <Navbar user={"merchant"} reRender={reRender} setReRender={setReRender} search={search} setSearch={setSearch} />
      </div>
      <div>
        <Box sx={{ flexGrow: 1, mt: 12 }}>
          <Grid container spacing={2}>
            <Grid item xs={0.1}></Grid>
            <Grid item xs={11.7}>
              <TransactionTable />
              {/* {
                (search == ""
                  ? allEvents?.map((item) => {
                    return <FeedCard event={item} reRender={reRender} setReRender={setReRender} search={search} setSearch={setSearch} />;
                  })
                  : allEvents?.map((item) => {
                    if (item.title.toLowerCase().includes(search.toLowerCase())) return <FeedCard reRender={reRender} setReRender={setReRender} search={search} setSearch={setSearch} event={item} />;
                    else if (item.description.toLowerCase().includes(search.toLowerCase())) return <FeedCard reRender={reRender} setReRender={setReRender} search={search} setSearch={setSearch} event={item} />;
                  }))
              } */}
            </Grid>
            <Grid item xs={0.1}></Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default MerchantDashboard;