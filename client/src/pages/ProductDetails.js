import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const [product, setProduct] = useState();
    const [similarProduct, setSimilarProduct] = useState();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(params?.slug) getProduct();
    }, [params?.slug])
    //Get product
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    //Similar Products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`);
            setSimilarProduct(data?.products);
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className='row container'>
            <div className='col-md-6'>
                <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} height={"300px"} width={"300px"} />
            </div>
            <div className='col-md-6'>
                <h1 className='text-center'>Product Details</h1>
                <h6>Name : {product?.name}</h6>
                <h6>Description : {product?.description}</h6>
                <h6>Price : {product?.price}</h6>
                <h6>Category : {product?.category.name}</h6>
                {/* <h6>Shipping : {product?.shipping}</h6> */}
                <button class="btn btn-secondary ms-1">Add to Cart</button>
            </div>
        </div>
        <div className='row container'>
            <h6>Similar Product</h6>
            {similarProduct?.length < 1 && (
                <p className='text-center'>No Similar Product Found</p>
            )} 
            {similarProduct?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                    {p.description.substring(0, 30)}...
                </p>
                <p className="card-text">
                    $ {p.price}
                </p>
                <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button class="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
    </Layout>
  )
}

export default ProductDetails