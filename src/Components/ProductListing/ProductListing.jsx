import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Error from '../Error/Error';



function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  async function getProducts() {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products');
      setProducts(data);
      setError(false);
    } catch (err) {
      console.error(err)
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="mb-5">Product Listing</h1>
      <div className="row gy-4">
        {loading ? (
          <div className="w-100 text-center">
            <div className="spinner-border fs-5" style={{ width: '10rem', height: ' 10rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? <Error /> : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductListing;
