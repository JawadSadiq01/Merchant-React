import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from '@mui/icons-material/Description';
import { NavLink } from 'react-router-dom';

const columns = [
  { id: 'index', label: 'Sr', minWidth: 10 },
  { id: 'name', label: 'Name', minWidth: 10 },
  { id: 'code', label: 'Email', minWidth: 700 },
  {
    id: 'population',
    label: '',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: '',
    minWidth: 17,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: '',
    minWidth: 17,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
  { name: "Haider Ali", email: 'hdrali036@gmail.com' },
];

export default function MerchantTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const merchantDetails = (merchant) => {
    console.log(merchant);
    //     <NavLink to="/details" state={{ title: title, image: image, description1: description1, description2y: description2, description3: description3 }} style={{ textDecoration: 'none' }}>
    // </NavLink>
  };
  const deleteMerchant = (merchant) => {
  };
  const editMerchant = (merchant) => {
  };

  return (
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
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={row.email} align={row.align}>
                      {index + 1}
                    </TableCell><TableCell key={row.email} align={row.align}>
                      {row.name}
                    </TableCell>
                    <TableCell key={row.email} align={row.align}>
                      {row.email}
                    </TableCell>
                    <TableCell key={row.email} align={'right'}>
                      <Button onClick={() => deleteMerchant(row)}> <DeleteIcon color="primary" /></Button>
                    </TableCell><TableCell key={row.email} align={'right'}>
                      <Button onClick={() => editMerchant(row)}> <EditIcon color="primary" /></Button>
                    </TableCell><TableCell key={row.email} align={'right'}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
}
