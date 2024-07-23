import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { Button, Modal } from 'antd';

const CreateCategory = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  //Create category form handle
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name});
      if(data?.success) {
        toast.success(`'${name}' Category is created`);
        getAllCategory();
        setName("");
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating category")
    }
  }


  //get all categories
  const getAllCategory = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
    try {
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm handleCreate={handleCreate} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" key={c._id}>
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2" key={c._id}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)}></Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
