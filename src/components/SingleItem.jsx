import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { destroyItem, fetchSingleItem, fetchAllItems } from "../axios-services";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useItems from "../Hooks/useItems";

//note this page is off api/itemS/#

// delete button works, but you do have to refresh in order for the site to register that it's gone
export default function SingleItem() {
  const { user } = useAuth();
  const { setItems } = useItems();
  const [singleItem, setSingleItem] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleItem = async () => {
      const mysingleItem = await fetchSingleItem(id);
      setSingleItem(mysingleItem);
    };
    getSingleItem();
  }, []);

  return (
    <>
      <div className="singleItemCard">
        {user.isAdmin ? (
          <button
            onClick={() => {
              navigate(`/edititem/${id}`);
            }}
          >
            Edit Item
          </button>
        ) : null}
        {user.isAdmin ? (
          <button
            onClick={async (e) => {
              e.preventDefault();
              await destroyItem(id);
              const newItems = await fetchAllItems();
              setItems(newItems);
              navigate("/home");
            }}
          >
            Delete Item
          </button>
        ) : null}
        <span>
          <img
            className="singleItemImg"
            id={singleItem.id}
            src={singleItem.imgUrl}
          />
        </span>
        <h2 className="singleItemName">{singleItem.name}</h2>
        <h4 className="singleItemPrice"> Price:{singleItem.price}</h4>
        <h4 className="singleItemStock"> Stock:{singleItem.stock}</h4>
        <h4 className="singleItemDesc">{singleItem.description}</h4>
      </div>
    </>
  );
}
