import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      })
        return total.toLocaleString("en-US",{
          style: "currency",
          currency: "USD",
      })
      } catch (error) {
      console.log(error);
    }
  }
  //Remove cart item
  const removeCartItem = (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Layout title={"Cart - Ecommerce"}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length > 1 ? `You have ${cart.length} in your cart. ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {cart?.map((p) => (
              <div className='row mb-2 p-3 card flex-row'>
                <div className='col-md-4'>
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                </div>
                <div className='col-md-8'>
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr/>
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className='mb-3'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile", {state: "/cart"})}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                {auth?.token ? (
                  <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile", {state: "/cart"})}>
                    Update Address
                  </button>
                ) : (
                  <button className='btn btn-outline-warning' onClick={() => navigate("/login", {state: "/cart"})}>
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage