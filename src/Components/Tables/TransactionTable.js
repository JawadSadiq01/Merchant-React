import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Modal } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import GLOBALS from '../../config';
import TransactionForm from '../Forms/TransactionForm';

const style = {
  position: "absolute",
  borderRadius: "1em",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // height: "95%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  zIndex: 1000,
  pt: 2,
  px: 4,
  pb: 3,
};
const columns = [
  { id: 'index', label: 'ID', minWidth: 10 },
  { id: 'email', label: 'Email', minWidth: 70 },
  { id: 'phone', label: 'Phone', minWidth: 70 },
  { id: 'amount', label: 'Amount', minWidth: 70 },
  { id: 'status', label: 'Status', minWidth: 10 },
  { id: 'type', label: 'Type', minWidth: 10 },
  { id: 'actions', label: '', minWidth: 10, align: 'right', },
];

export default function TransactionTable({ reRender, setReRender, setTransactions, transactions }) {
  const [open, setOpen] = React.useState(false);
  const [currentTransaction, setCurrentTransaction] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    setPage(0);
  }, [reRender]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteTransaction = (transaction) => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions/' + transaction.id;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
      },
    };
    axios.delete(url, config)
      .then((response) => {
        setReRender(!reRender);
      })
      .catch((error) => {
        console.log('Api Error', error);
      });
  };

  const editTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    handleOpen();
  };

  const chargeTransaction = (transaction) => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions/' + transaction.id;
    console.log(url);
    const postData = {
      "transaction": {
        amount: transaction.amount,
        status: "approved",
        customer_email: transaction.customer_email,
        customer_phone: transaction.customer_phone,
        type: 'ChargeTransaction',
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
        setReRender(!reRender);
      })
      .catch((error) => {
        console.log("axios error: ", error);
      });
  };

  const refundTransaction = (transaction) => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions/' + transaction.id;
    console.log(url);
    const postData = {
      "transaction": {
        amount: transaction.amount,
        customer_email: transaction.customer_email,
        customer_phone: transaction.customer_phone,
        status: 'refunded',
        type: 'RefundTransaction'
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
        setReRender(!reRender);
      })
      .catch((error) => {
        console.log("axios error: ", error);
      });
  };

  const reverseTransaction = (transaction) => {
    let url = GLOBALS.BASE_URL + 'merchants/' + localStorage.getItem("merchant_id") + '/transactions/' + transaction.id;
    console.log(url);
    const postData = {
      "transaction": {
        amount: transaction.amount,
        status: 'reversed',
        type: 'ReverseTransaction',
        customer_email: transaction.customer_email,
        customer_phone: transaction.customer_phone,
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
        setReRender(!reRender);
      })
      .catch((error) => {
        console.log("axios error: ", error);
      });
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{ ...style, width: 500, mt: 10, background: "#a8b8da", }}
          >
            <TransactionForm transaction={currentTransaction} setReRender={setReRender} reRender={reRender} setOpen={setOpen} />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  <h3>Transactions</h3>
                </TableCell>
              </TableRow>

              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <h5>{column.label}</h5>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                transactions.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell align={row.align}>
                        {row.id}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.customer_email}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.customer_phone}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.amount}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.status}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.type}
                      </TableCell>

                      <TableCell style={{ display: 'flex', flexDirection: 'row' }} align={'right'}>
                        <div style={{ width: '16rem' }}>
                          {row.status == 'approved' && row.type == "AuthorizeTransaction" && <button style={{ width: '6rem', marginRight: '0.5rem' }} onClick={() => chargeTransaction(row)} className='btn btn-success'>Charge</button>}
                          {row.status == 'approved' && row.type == "AuthorizeTransaction" && <button style={{ width: '6rem', marginRight: '0.5rem' }} onClick={() => reverseTransaction(row)} className='btn btn-danger' >Reverse</button>}
                          {row.status == 'approved' && row.type == "ChargeTransaction" && <button style={{ width: '6rem', marginRight: '0.5rem' }} onClick={() => refundTransaction(row)} className='btn btn-danger' >Refund</button>}
                          {row.status == 'reversed' && row.type == "ReverseTransaction" && <button style={{ width: '6rem', marginRight: '0.5rem' }} className='btn btn-danger disabled' >Reversed</button>}
                          {row.status == 'refunded' && row.type == "RefundTransaction" && <button style={{ width: '6rem', marginRight: '0.5rem' }} className='btn btn-danger disabled' >Refunded</button>}
                        </div>
                        <Button onClick={() => editTransaction(row)}> <EditIcon color="success" /></Button>
                        <Button onClick={() => deleteTransaction(row)}> <DeleteIcon color="error" /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper >
    </>
  );
}