import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const [product, setProduct] = useState();
    const params = useParams();

    useEffect(() => {
        if(params?.slug) getProduct();
    }, [params?.slug])
    //Get product
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`);
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout>
        <div className='row container'>
            <div className='col-md-6'>
                <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
            </div>
            <div className='col-md-6'>
                <h1 className='text-center'>Product Details</h1>
                <h6>Name : {product?.name}</h6>
                <h6>Description : {product?.description}</h6>
                <h6>Price : {product?.price}</h6>
                <h6>Category : {product?.category.name}</h6>
                {/* <h6>Shipping : {product?.shipping}</h6> */}
            </div>
        </div>
        <div className='row'>Similar products</div>
    </Layout>
  )
}

export default ProductDetails