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
import { Alert } from '@mui/material';

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
  { id: 'name', label: 'Name', minWidth: 10 },
  { id: 'code', label: 'Email', minWidth: 70 },
  { id: 'code', label: 'Status', minWidth: 10 },
  { id: 'actions', label: '', minWidth: 10, align: 'right', },
];

export default function MerchantTable({ setAllMerchants, reRender, setReRender, allMerchants }) {
  const [open, setOpen] = React.useState(false);
  const [currentMerchant, setCurrentMerchant] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');

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

  const deleteMerchant = (merchant) => {
    let url = GLOBALS.BASE_URL + 'merchants/' + merchant.id;
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
        if (response.data.error == true) { setSuccessMsg(""); setErrorMsg(response.data.msg + '!'); }
        else { setSuccessMsg("Merchant Deleted Successfully!"); }

        setTimeout(() => {
          setErrorMsg("");
          setSuccessMsg("");
        }, 3000);

        setReRender(!reRender);
      })
      .catch((error) => {
        setErrorMsg("Network Error!");
        setTimeout(() => {
          setErrorMsg("");
          setSuccessMsg("");
        }, 3000);
        console.log('Api Error', error);
      });
  };
  const editMerchant = (merchant) => {
    setCurrentMerchant(merchant);
    handleOpen();
  };

  return (
    <>
      <div>
        {errorMsg != "" && <Alert style={{ marginBottom: 10 }} severity="error">{errorMsg}</Alert>}
        {successMsg != "" && <Alert style={{ marginBottom: 10 }} severity="success">{successMsg}</Alert>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{ ...style, width: 500, mt: 10, background: "#a8b8da", }}
          >
            <MerchantForm merchant={currentMerchant} setReRender={setReRender} reRender={reRender} setOpen={setOpen} />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  <h3>Merchants</h3>
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
                allMerchants.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell align={row.align}>
                        {row.id}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.name}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.email}
                      </TableCell>

                      <TableCell align={row.align}>
                        {row.status}
                      </TableCell>

                      <TableCell align={'right'}>
                        <Button onClick={() => deleteMerchant(row)}> <DeleteIcon color="error" /></Button>
                        <Button onClick={() => editMerchant(row)}> <EditIcon color="success" /></Button>
                        <NavLink to="/merchant-Detail" state={{ merchant: row }} style={{ textDecoration: 'none' }}>
                          <Button ><DescriptionIcon color="primary" /></Button>
                        </NavLink>
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
          count={allMerchants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper >
    </>

  );
}
