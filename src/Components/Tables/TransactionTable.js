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
import DescriptionIcon from '@mui/icons-material/Description';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GLOBALS from '../../config';
import MerchantForm from '../Forms/MerchantForm';
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
  console.log(transactions);
  const [open, setOpen] = React.useState(false);
  const [currentTransaction, setCurrentTransaction] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  React.useEffect(() => {
    setPage(0);
  }, [reRender]);
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
        console.log(response);
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

                      <TableCell align={'right'}>
                        <Button onClick={() => deleteTransaction(row)}> <DeleteIcon color="primary" /></Button>
                        <Button onClick={() => editTransaction(row)}> <EditIcon color="primary" /></Button>
                        {/* <NavLink to="/merchant-Detail" state={{ merchant: row }} style={{ textDecoration: 'none' }}>
                          <Button ><DescriptionIcon color="primary" /></Button>
                        </NavLink> */}
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


// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Button } from '@mui/material';
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DescriptionIcon from '@mui/icons-material/Description';
// import { NavLink } from 'react-router-dom';

// const columns = [
//   { id: 'index', label: 'Sr', minWidth: 10 },
//   { id: 'name', label: 'Name', minWidth: 10 },
//   { id: 'code', label: 'Email', minWidth: 700 },
//   {
//     id: 'population',
//     label: '',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: '',
//     minWidth: 17,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: '',
//     minWidth: 17,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
//   { name: "Haider Ali", email: 'hdrali036@gmail.com' },
// ];

// export default function TransactionTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const merchantDetails = (merchant) => {
//     console.log(merchant);
//     //     <NavLink to="/details" state={{ title: title, image: image, description1: description1, description2y: description2, description3: description3 }} style={{ textDecoration: 'none' }}>
//     // </NavLink>
//   };
//   const deleteMerchant = (merchant) => {
//   };
//   const editMerchant = (merchant) => {
//   };


//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: '100%' }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="center" colSpan={12}>
//                 <h3>Transactions</h3>
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//               rows.map((row, index) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     <TableCell key={row.email} align={row.align}>
//                       {index + 1}
//                     </TableCell><TableCell key={row.email} align={row.align}>
//                       {row.name}
//                     </TableCell>
//                     <TableCell key={row.email} align={row.align}>
//                       {row.email}
//                     </TableCell>
//                     <TableCell key={row.email} align={'right'}>
//                       <Button onClick={() => deleteMerchant(row)}> <DeleteIcon color="primary" /></Button>
//                     </TableCell><TableCell key={row.email} align={'right'}>
//                       <Button onClick={() => editMerchant(row)}> <EditIcon color="primary" /></Button>
//                     </TableCell><TableCell key={row.email} align={'right'}>
//                       <NavLink to="/merchant-Detail" state={{ merchant: row }} style={{ textDecoration: 'none' }}>
//                         <Button ><DescriptionIcon color="primary" /></Button>
//                       </NavLink>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             }
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper >
//   );
// }
