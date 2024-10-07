import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Grid } from '@mui/material';

function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    supplier: '',
    dateAdded: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage or any other secure place
        const response = await axios.get(`http://localhost:3000/product/getSpecificProduct/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage or any other secure place
      await axios.put(`http://localhost:3000/product/editProduct/${id}`, product, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/products'); // Redirect to the products list page
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Supplier"
              name="supplier"
              value={product.supplier}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date Added"
              name="dateAdded"
              type="date"
              value={product.dateAdded.substring(0, 10)} // Format date
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={product.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default EditProduct;
