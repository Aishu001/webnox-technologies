import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'quantity', label: 'Quantity', minWidth: 170, align: 'right' },
  { id: 'supplier', label: 'Supplier', minWidth: 170 },
  { id: 'dateAdded', label: 'Date Added', minWidth: 170 },
  { id: 'location', label: 'Location', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 }
];

function Products() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate()
  useEffect(() => {
    // Fetch data from the API with authorization header
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage or any other secure place
        const response = await axios.get('http://localhost:3000/product/getAllProduct', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRows(response.data);
      } catch (error) {
        console.error("There was an error fetching the product data!", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    // Implement the edit functionality here

    console.log('Edit clicked for:', row);
    navigate(`/editProduct/${row._id}`)
  };

  const handleDelete = async (row) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage or any other secure place
      const response = await axios.delete(`http://localhost:3000/product/deleteProduct/${row._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Delete successful:', response.data);
      
      // Optionally, you can update the state to remove the deleted row from the table
      setRows(rows.filter(product => product._id !== row._id));
    } catch (error) {
      console.error('There was an error deleting the product:', error);
    }
  };
  

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                          <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>Edit</Button>
                              <Button variant="contained" color="secondary" onClick={() => handleDelete(row)}>Delete</Button>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
      </Paper>
    </>
  );
}

export default Products;
