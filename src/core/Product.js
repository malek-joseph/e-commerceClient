import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "../core/Search";
import { read, listRelated } from "./apiCore";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log(data);
        setProduct(data);
        // We only get related if we got the single product only
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProducts(data)
        }
        })
      }
    });
  };

  const params = useParams();

  useEffect(() => {
    console.log('hi');
    const productId = params.productId;
    loadSingleProduct(productId);
  }, [params]);

  return (
    <Layout
      title={product && product.name}
      className="container-fluid"
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      <h2 className="mb-3">Single Product</h2>
      <div className="row">
        {/* {JSON.stringify(product )} */}
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h2>Related Products</h2>
          {/* Related products displays the other elements sharing the same category of the viewed product */}
          {relatedProducts.map((product, index) => (
            <Card className='mb-3' key={index} product={ product}/>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
