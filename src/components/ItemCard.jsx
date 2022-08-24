import React, { useState } from "react";
import { addCartItem } from "../axios-services";
import useCart from "../Hooks/useCart";

function ItemCard({ item }) {
  const [quantity, setQuantity] = useState("");
  const { cartItems } = useCart();
  return (
    <div className="wrapper">
      <div className="itemCard" id={item.id}>
        <h4 id={item.id}>{item.id}</h4>
        <span>
          <img id={item.id} src={item.imgUrl} />
        </span>
        <h4 id={item.id}>{item.name}</h4>
        <h5 id={item.id}>{item.price}₽</h5>
        <h5 id={item.id}>Stock: {item.stock}</h5>
        <h6 id={item.id}>Floor: {item.floorId}</h6>
        <h6 id={item.id}>Type: {item.type}</h6>
        <a href={`/items/${item.id}`}>View Item</a>
        <span>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await addCartItem(item.id, cartItems[0].id, quantity);
            }}
          >
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button type="submit">Add to Cart</button>
          </form>
        </span>
      </div>
    </div>
  );
}

export default ItemCard;
