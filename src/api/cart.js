//------------get all items in user cart
export const fetchAllCartItems = async (userId) => {
  console.log(userId, "just to confirm its here");
  const response = await fetch(`/api/cart/orders/active/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result, "FETCH ALL CART ITEMS");
  return result;
};
//----------delete item in user cart
export const deleteCartItem = async (id) => {
  const response = await fetch(`/api/cart/item/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result, "DELETED");
  return result;
};

//------------add item to user cart  ----
export const addCartItem = async (itemId, orderId, inquantity) => {
  let quantity = +inquantity;

  const response = await fetch(`/api/cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemId,
      orderId,
      quantity,
    }),
  });
  const result = await response.json();
  console.log(result, "ADDED");
  return result;
};
//---------edit quantity in user cart
export const editCartQuantity = async (id, inquantity) => {
  let quantity = +inquantity;
  //CONSOLE.LOG ABOVE FIRES
  const response = await fetch(`/api/cart/item/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity,
    }),
  });
  const result = await response.json();
  console.log(result, "EDITED");
  return result;
};

//-----------DELETE WHOLE CART
export const deleteCart = async (id) => {
  console.log(id, "NEED TO GET THIS ID NOW");
  const response = await fetch(`/api/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result, "deleted result");
  return result;
};