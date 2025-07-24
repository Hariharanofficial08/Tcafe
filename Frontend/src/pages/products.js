import React, { useEffect, useState } from "react";
import { getProducts, getCategories } from "../services/api";
import "./products.css";


function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories on load
  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts(selectedCategory);
      setProducts(data);
    }
    fetchProducts();
  }, [selectedCategory]);

  const addToBill = (product) => {
    setBillItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setBillItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item)).filter((item) => item.qty > 0)
    );
  };

  const clearBill = () => {
    setBillItems([]);
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="pos-container">
      {/* Sidebar - Categories */}
      <div className="sidebar">
        <h4>Categories</h4>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`category-btn ${selectedCategory === null ? "active" : ""}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="product-list">
        <h4>Products</h4>
        <div className="products-grid">
          {products.map((product) => (
            <button key={product.id} className="product-button" onClick={() => addToBill(product)}>
              {product.name}
              <br />₹{product.price}
            </button>
          ))}
        </div>
      </div>

      {/* Billing Section */}
      <div className="billing-panel">
        <h4>Billing</h4>
        <div className="bill-items">
          {billItems.map((item) => (
            <div key={item.id} className="bill-row">
              <div className="col-name">{item.name}</div>

              <div className="col-qty">
                <button className="qty-controls" onClick={() => updateQty(item.id, -1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button className="qty-controls" onClick={() => updateQty(item.id, 1)}>
                  +
                </button>
              </div>

              <div className="col-price">₹{item.price}</div>
              <div className="col-total">₹{item.qty * item.price}</div>
            </div>
          ))}
        </div>

        {/* <div className="bill-items">
          {billItems.map((item) => (
            <div key={item.id} className="bill-item">
              <span>{item.name}</span>
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <span>₹{item.price}</span>
              <span>Total: ₹{item.qty * item.price}</span>
            </div>
          ))}
        </div> */}
        <div className="total-amount">
          <strong>Total: ₹{totalAmount}</strong>
        </div>
        <div className="bill-actions">
          <button>Bill</button>
          <button>Pending</button>
          <button onClick={clearBill}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
