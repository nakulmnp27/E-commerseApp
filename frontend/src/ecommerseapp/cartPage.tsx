import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

async function fetchCart() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:4000/cart-item", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("cart response", res.data);

    setCartItems(res.data);
  } catch (err: any) {
    console.log(err.response?.data?.message);
  }
}

const updateQuantity = async (productId: string, quantity: number) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      "http://localhost:4000/cart-item/update",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchCart(); 

  } catch (err: any) {
    console.log(err.response?.data?.message);
  }
};

const removeItem = async (productId: string) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:4000/cart-item/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    fetchCart();
  } catch (err) {
    console.log("remove error", err);
  };

  useEffect(() => {
    fetchCart();
  }, []);
}


  return (
    <div className="space-y-3">
      {cartItems.map((item: any) => (
        <div key={item.productId} className="flex gap-4 items-center">
          <p>{item.product.prod_name}</p>
          <p>₹{item.product.prod_price}</p>

          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded border" onClick={()=>{
              if(item.quantity>1){updateQuantity(item.productId,item.quantity-1)}
            }}> - </button>

            <input type="number" value={item.quantity}  readOnly  className="w-12 text-center border"></input>

            <button onClick={()=>{updateQuantity(item.productId,item.quantity+1)}} className="h-8 w-8 rounded border">+</button>

            <div className="text-right">
              <p className="font-semibold"> ₹ {item.product.prod_price * item.quantity} </p>
              <button onClick={() => removeItem(item.product.id)} className="text-red-500 text-sm mt-1"> Remove </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
