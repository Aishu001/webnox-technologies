import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    supplier: '',
    dateAdded: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage or any other secure place
      const response = await axios.post('http://localhost:3000/product/createProduct', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Product added successfully:', response.data);
      // Reset the form after successful submission
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        supplier: '',
        dateAdded: '',
        location: ''
      });
    } catch (error) {
      console.error('There was an error adding the product:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            size="lg"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            size="lg"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter product quantity"
          />
        </Form.Group>

        <Form.Group controlId="formSupplier">
          <Form.Label>Supplier</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Enter supplier name"
          />
        </Form.Group>

        <Form.Group controlId="formDateAdded">
          <Form.Label>Date Added</Form.Label>
          <Form.Control
            size="lg"
            type="date"
            name="dateAdded"
            value={formData.dateAdded}
            onChange={handleChange}
            placeholder="Enter date added"
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter product location"
          />
        </Form.Group>
        <Link to='products'>  <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button></Link>
      
      </Form>
    </>
  );
}

export default AddProduct;
