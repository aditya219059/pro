import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(params?.slug) getCategoryProduct();
    }, [params?.slug]);

    //Get category product
    const getCategoryProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className='container'>
            <h5 className='text-center'>{category?.name}</h5>    
            <h6 className='text-center'>{products?.length} results found</h6>
            <div className='d-flex flex-wrap offset-1'>
          {products?.map((p) => (
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
          {/* <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "loading..." : "Load more"}
              </button>
            )}
          </div> */}
        </div>
    </Layout>
  )
}

export default CategoryProduct