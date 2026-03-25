import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productsSlice";
import AddProduct from "./addProducts";
// import { addToCart } from "../store/cartSlice";

export default function Heropage():JSX.Element{
    const dispatch = useDispatch();
    const products = useSelector((state:any) => state.products.items)
    const [toast, setToast] = useState(false)
    const [popUp, setPopup] = useState(false)

    useEffect(()=>{
        fetchProducts();
    },[])

    async function fetchProducts() {
    try {
        const res = await axios.get("http://localhost:4000/product");
        dispatch(setProducts(res.data));
    } catch (err: any) {
        console.log(err.response?.data?.message);
    }
    }

const addToCartHandler = async (productId: string) => {
  try {
    const token = localStorage.getItem("token"); 

    await axios.patch(
      "http://localhost:4000/cart-item/update",
      {
        productId,
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      }
    );

    console.log("Added to cart");
    setToast(true)
    setTimeout(()=> setToast(false), 2000)
  } catch (err: any) {
    console.log(err.response?.data?.message);
  }
};
    return (
        <>
            {toast && (<div className="fixed top-20 right-5"><p className="text-green-500 bg-white shadow-2xl text-lg flex justify-center p-4"> Added to Cart</p></div>)}
        <div className=" min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-6">Products</h1>
            <button onClick={() => popUp ? setPopup(false) : setPopup(true)}>+</button>
            {
                popUp && (
                    <div className="flex items-center justify-center z-50 p-4">
                        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5">
                            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                            <AddProduct
                                onClose={() => setPopup(false)}
                                onSuccess={async () => {
                                    await fetchProducts();
                                    setPopup(false);
                                }}
                            />
                        </div>
                    </div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {products.map((p: any) =>(
                    <div key={p.id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md" >
                        <div className="">
                            <h2 className="text-lg font-semibold mb-2">{p.prod_name}</h2>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {p.prod_description}
                            </p>
                        </div>

                        <div className="">
                            <p className="text-xl font-bold mb-3">₹{p.prod_price}</p>
                            <button onClick={() => addToCartHandler(p.id)} className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"> Add to Cart</button>
                        </div>
                    </div>
                ) )}
            </div>
        </div>
        </>
    );
}
