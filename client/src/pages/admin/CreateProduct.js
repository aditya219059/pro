import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all categories
  const getAllCategory = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/get-category`
    );
    try {
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //Create Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("category", category)
      productData.append("photo", photo)
      const {data} = axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData );
      if(data?.success) {
        toast.error(data?.message)
      }
      else{
        setTimeout(() => {
          toast.success("Product Created Successfully")
          
        }, 400);
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="from-select mb-3 w-100"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder="Write a product name" className="form-control" onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <textarea type="text" value={description} placeholder="Write a product description" className="form-control" onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="text" value={price} placeholder="Write a product price" className="form-control" onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder="Write a product Quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <div className="mb-3">
                <Select className="form-select mb-3" placeholder="Select shipping" size="large" showSearch onChange={(value) => setShipping(value)}>
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
