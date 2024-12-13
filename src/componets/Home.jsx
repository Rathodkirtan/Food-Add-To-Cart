import React, { useState } from "react";
import Icon from "../assets/images/icon-add-to-cart.svg";
import Increase from "../assets/images/icon-increment-quantity.svg";
import Decrease from "../assets/images/icon-decrement-quantity.svg";
import Data from "../../data.json";
import AddToCart from "./AddToCart";
import Cartimg from "./Cartimg";

function Home() {
  const [AddCart, setAddCart] = useState([]);

  const addList = (productItem) => {
    const existingItem = AddCart.find((item) => item.id === productItem.id);

    if (existingItem) {
      // If the product already exists in the cart, increase its quantity
      setAddCart(
        AddCart.map((item) =>
          item.id === productItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add the product to the cart with quantity initialized to 1
      setAddCart([...AddCart, { ...productItem, quantity: 1, isValid: true }]);
    }
  };

  const handleDelete = (id) => {
    const updatedCart = AddCart.filter((item) => item.id !== id);
    setAddCart(updatedCart);
  };

  const updateQuantity = (id, amount) => {
    setAddCart(
      AddCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  console.log(AddCart);

  return (
    <div className="container">
      <div className="row d-flex flex-wrap">
        <div className="col-12 col-md-8 mt-5">
          <h3
            style={{ fontFamily: "Red Hat Text, sans-serif", fontWeight: 800 }}
          >
            Desserts
          </h3>
          <div className="d-flex flex-wrap justify-content-between">
            {Data.map((productItem) => {
              return (
                <div className="cart" key={productItem.id}>
                  <img
                    src={productItem.image.mobile}
                    alt="img"
                    style={{ width: "220px" }}
                    className="rounded"
                  />
                  <div className="cart-body">
                    {AddCart.some((item) => item.id === productItem.id) ? (
                      <div
                        style={{
                          background: "hsl(14, 86%, 42%)",
                          fontFamily: "Red Hat Text, sans-serif",
                          fontWeight: 500,
                          position: "relative",
                          bottom: "20px",
                          left: "45px",
                          width: "120px",
                          textAlign: "center",
                          height: "32px",
                        }}
                        className="rounded-pill p-1"
                      >
                        <img
                          src={Increase}
                          alt="Increase"
                          className="pe-3"
                          onClick={() => updateQuantity(productItem.id, 1)}
                        />
                        {
                          AddCart.find((item) => item.id === productItem.id)
                            ?.quantity || 1
                        }
                        <img
                          src={Decrease}
                          alt="Decrease"
                          className="ps-3"
                          onClick={() => updateQuantity(productItem.id, -1)}
                        />
                      </div>
                    ) : (
                      <button
                        className="rounded-pill bg-white"
                        style={{
                          borderColor: "hsl(14, 86%, 42%)",
                          fontFamily: "Red Hat Text, sans-serif",
                          fontWeight: 500,
                          position: "relative",
                          bottom: "17px",
                          left: "40px",
                        }}
                        onClick={() => addList(productItem)}
                      >
                        <img src={Icon} alt="Icon" /> Add to Cart
                      </button>
                    )}
                    <p
                      className="mb-0"
                      style={{
                        fontFamily: "Red Hat Text, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {productItem.name}
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontFamily: "Red Hat Text, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {productItem.category}
                    </p>
                    <p
                      style={{
                        fontFamily: "Red Hat Text, sans-serif",
                        fontWeight: 800,
                      }}
                    >
                      $ {productItem.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-12 col-md-4 mt-5">
          <div className="side bg-white shadow-sm">
            <h4 style={{ color: "hsl(14, 86%, 42%)" }}>
              Your Cart ({AddCart.length})
            </h4>
            {AddCart.length === 0 ? (
              <Cartimg />
            ) : (
              <AddToCart Additem={AddCart} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
