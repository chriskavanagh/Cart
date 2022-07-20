import React, { useEffect, useState } from "react";
//import storeItems from "./items.json";
//import { Button } from "rsuite";

export default function Store() {
  const [disable, setDisable] = useState(false);
  const [value, setValue] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 2,
      quantity: 1
    },
    {
      id: 4,
      quantity: 1
    }
  ]);
  console.log(JSON.stringify(cartItems));

  /* function btnControl() {
    cartItems.forEach((item) => {
      item.quantity > 9 ? setDisable(true) : setDisable(false);
    });
  }

  function btnControldecrease() {
    cartItems.forEach((item) => {
      item.quantity < 1 ? setDisable(true) : setDisable(false);
    });
  } */

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) === 0) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            if (item.quantity === 10) {
              return { ...item, quantity: item.quantity + 0 };
            } else {
              return { ...item, quantity: item.quantity + value };
            }
          } else {
            return item;
          }
        });
      }
    });
  }

  /* function decreaseCartQuantity(id) {
    //const existing_item = cartItems.find((item) => item.id === id);
    let x = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else if (item.id === id && item.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return item;
      }
    });
    return setCartItems([...x]);
  } */

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === -1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return { ...item, quantity: item.quantity - 0 };
            }
          } else {
            return item;
          }
        });
      }
    });
  }

  const handleChange = (id) => (e) => {
    //setValue(e.target.value);
    return setCartItems((currItems) =>
      currItems.map((item) => {
        if (item.id === id) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  console.log(value);

  return (
    <main>
      <h1 className="store__header">My Store</h1>
      <div>
        {cartItems.map((item, index) => (
          <section className="store__section" key={index}>
            <h4>Id:{item.id}</h4>
            <label
              htmlFor="quantity"
              id="quantity"
              style={{ marginRight: "15px" }}
            >
              Quantity:
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              max="5"
              value={item.quantity}
              // don't need arrow func because handleChange is curried func
              onChange={handleChange(item.id)}
            />
            {item.quantity == 5 ? (
              <div style={{ marginTop: "10px", color: "red" }}>
                You've reached the maximum limit.
              </div>
            ) : null}
          </section>
        ))}
      </div>
      <button onClick={() => increaseCartQuantity(4)}>Increase Quantity</button>
      <button onClick={() => decreaseCartQuantity(4)}>Decrease Quantity</button>
    </main>
  );
}
