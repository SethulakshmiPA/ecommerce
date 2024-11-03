import React, { useState } from 'react';
import './Admin.css';


const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    size: 'please',
    color: '',
    material: '',
    brand_name: '',
    category_id: '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    setImages(event.target.files);
    const previewImages = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previewImages);
  };

  const handleAddMoreClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "stock_quantity") {
      const newValue = Math.max(0, Number(value));
      setProduct({ ...product, [name]: newValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    console.log('Images submitted:', images);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Enter product name" required />

        <label>Description</label>
        <input type="text" name="description" value={product.description} onChange={handleInputChange} placeholder="Enter product description" />

        <label>Price</label>
        <input type="text" name="price" value={product.price} onChange={handleInputChange} placeholder="Enter price" />

        <label>Stock Quantity</label>
        <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleInputChange} placeholder="Enter stock quantity" />

        <label> Size:</label>
        <br></br>
        <select name="size" value={product.size} onChange={handleInputChange} className='full-width-dropdown'>
          <option value="please">---please enter a size---</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        <br></br>

        <label>Color</label>
        <input type="text" name="color" value={product.color} onChange={handleInputChange} placeholder="Enter color" />

        <label>Material</label>
        <input type="text" name="material" value={product.material} onChange={handleInputChange} placeholder="Enter material" />

        <label>Brand Name</label>
        <input type="text" name="brand_name" value={product.brand_name} onChange={handleInputChange} placeholder="Enter brand name" />

        <label>Category ID</label>
        <input type="text" name="category_id" value={product.category_id} onChange={handleInputChange} placeholder="Enter category id" />

        <div>
          <input type="file" id="fileInput" accept="image/*" multiple onChange={handleImageChange} />
          <button onClick={handleAddMoreClick}>Add more files</button>
          {images.length > 0 && (
            <div>
              {imagePreviews.map((imgSrc, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
                  <img src={imgSrc} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  <p style={{ textAlign: 'center', fontSize: '0.8rem' }}>Pic {index + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="button-container">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
