import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';

const Home = () => {
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

   //get all categories
   const getAllCategory = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
    try {
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //Get products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      // console.log(data)
      setProducts(data.products)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if(checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //Category Filter function
  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value) {
      all.push(id);
    }
    else {
      all = all.filter(c => c!==id);
    }
    setChecked(all);
  }

  //Get filter products
  const filterProduct = async () => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, {checked, radio,});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={'Home - Ecommerce'}>
      <div className='row'>
        <div className='col-md-3 mt-3'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
          {categories?.map(c => (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>
          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className='d-flex flex-column'>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map(p => (
              <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
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
                <button class="btn btn-primary ms-1">More Details</button>
                <button class="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home