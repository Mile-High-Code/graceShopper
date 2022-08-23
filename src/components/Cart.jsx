import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../Hooks/useCart";
import {
  deleteCartItem,
  editCartQuantity,
  deleteCart,
  purchaseCart,
  createNewCart,
} from "../axios-services/index";
import useAuth from "../Hooks/useAuth";
export default function Cart() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState("");
  let [isFulfilled, setIsFulfilled] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  console.log(cartItems, "the cart itesm");
  return cartItems.length !== 0 ? (
    <>
      <div>
        {cartItems.map((item, index) => {
          return (
            <div className="wrapper">
              <h4 key={`Key: ${index}`} className="itemCard">
                <div>PokeCart:</div>
                <div>
                  Your UserId:{item.userId}
                  <img id={item.id} src={item.imgUrl} />
                </div>
                <div>Total: {item.totalPrice}₽</div>
                <div>Shpping Info: {cartItems[0].shippingAddress}</div>
                {item.orderitems.map((orderitem, index) => {
                  return (
                    <>
                      <p>
                        Item: {orderitem.items.name}
                        <img src={orderitem.items.imgUrl} /> Quantity:
                        {orderitem.quantity}
                        <span> Unit price: {orderitem.items.price}</span>
                      </p>
                      <span>
                        <form
                          onSubmit={async (event) => {
                            event.preventDefault();
                            await editCartQuantity(orderitem.id, quantity);
                            console.log("U MADE IT PAST THE BLOCK");
                          }}
                        >
                          <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                          <button type="submit">Edit Quantity</button>
                        </form>
                        <button
                          onClick={async (event) => {
                            event.preventDefault();
                            console.log("del button pressed");
                            await deleteCartItem(orderitem.id);
                          }}
                        >
                          Delete Item
                        </button>
                      </span>
                    </>
                  );
                })}
                <span>
                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      await deleteCart(cartItems[0].id);
                    }}
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      console.log("purchase button");
                      //CANT SWITCH ACTIVE CART TO ISFULFILLED TRUE
                      //BUT CAN CREATE A NEW CART ISFULFILLED FALSE
                      // setIsFulfilled(true);
                      // console.log(isFulfilled, "before should be true"); //CURRENLLY FALSE. PROBLEM HERE
                      await purchaseCart(cartItems[0].id);
                      // setIsFulfilled(false);
                      // console.log(isFulfilled, "after, should be false");
                      await createNewCart(user.id, totalPrice, user.address);
                      navigate("/purchase");
                    }}
                  >
                    Purchase
                  </button>
                </span>
              </h4>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <h1 className="Error">Your cart is currently empty!</h1>
  );
}
