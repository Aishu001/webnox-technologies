import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import axios from 'axios';



function Purchase() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    // Fetch the products when the component mounts
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3000/product/getAllProduct', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch product details for all selected products
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const responses = await Promise.all(
          selectedProducts.map(id =>
            axios.get(`http://localhost:3000/product/getSpecificProduct/${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
          )
        );
        setProductDetails(responses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (selectedProducts.length > 0) {
      fetchProductDetails();
    } else {
      setProductDetails([]);
    }
  }, [selectedProducts]);

  const handleChange = (event) => {
    setSelectedProducts(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="product-select-label">Product</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          multiple
          value={selectedProducts}
          label="Product"
          onChange={handleChange}
        >
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ marginTop: 2 }}>
        {productDetails.length > 0 ? (
          productDetails.map((details) => (
            <Box key={details._id} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Product Details</Typography>
              <Typography><strong>Name:</strong> {details.name}</Typography>
              <Typography><strong>Description:</strong> {details.description}</Typography>
              <Typography><strong>Category:</strong> {details.category}</Typography>
              <Typography><strong>Price:</strong> ${details.price}</Typography>
              <Typography><strong>Quantity:</strong> {details.quantity}</Typography>
              <Typography><strong>Supplier:</strong> {details.supplier}</Typography>
              <Typography><strong>Date Added:</strong> {new Date(details.dateAdded).toLocaleDateString()}</Typography>
              <Typography><strong>Location:</strong> {details.location}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No products selected</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Purchase;
