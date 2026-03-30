import { useEffect, useState, type JSX } from "react";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productsSlice";
import AddProduct from "./addProducts";
import {useNavigate } from "react-router-dom";
// import { addToCart } from "../store/cartSlice";

export default function Heropage():JSX.Element{
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const products = useSelector((state:any) => state.products.items)
    const [toast, setToast] = useState(false)
    const [popUp, setPopup] = useState(false)
    const [search,setSearch] = useState("")
    const [debounce, setDebounce] = useState("")

    useEffect(()=>{
        fetchProducts();
    },[])

    
    async function fetchProducts() {
        try {
            const res = await api.get("/product");
            dispatch(setProducts(res.data));
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }
    
    const handleAddToCart = async (productId: string) => {
        try {
            const token = localStorage.getItem("token"); 

            if(!token){
                alert("Session Timedout!! Please log in to continue bro...")
                navigate("/login")
                return;
            }
            
            await api.patch( "/cart-item/update", {
                    productId,
                    quantity: 1
                },
            );
            
            console.log("Added to cart");
            setToast(true)
            setTimeout(()=> setToast(false), 2000)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    };
    
    const searchType= search.trim().toLowerCase();
    const displayProducts = debounce
    ? products.filter((p: any) => p.prod_name.toLowerCase().includes(debounce))
    : products;

    useEffect(() =>{
        const timer = setTimeout(() => setDebounce(searchType),500)
        return () => clearTimeout(timer)
    },[searchType])

    return (
        <>
            {toast && (<div className="fixed top-20 right-5"><p className="text-green-500 bg-white shadow-2xl text-lg flex justify-center p-4"> Added to Cart</p></div>)}
        <div className=" min-h-screen  p-6">
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold mb-6">Products</h1>

            <input className="max-w-md mb-6 bg-white rounded-2xl shadow-2xl px-9" value={search} onChange={(e) =>setSearch(e.target.value) } placeholder="search for products..."></input>
            <button onClick={() => popUp ? setPopup(false) : setPopup(true)} className="text-4xl font-semibold mb-6">+</button>
            {
                popUp && (
                    <div className="fixed inset-0  flex items-center justify-center p-4 bg-gray-500/80 ">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {displayProducts.map((p: any) =>(
                    <div key={p.id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md" >
                        <div className="">
                            <h2 className="text-lg font-semibold mb-2">{p.prod_name}</h2>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {p.prod_description}
                            </p>
                        </div>

                        <div className="">
                            <p className="text-xl font-bold mb-3">₹{p.prod_price}</p>
                            <button onClick={() => handleAddToCart(p.id)} className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"> Add to Cart</button>
                        </div>
                    </div>
                ) )}
            </div>
            {displayProducts.length === 0 && (
                <p className="text-gray-500 mt-6">No products found.</p>
            )}
        </div>
        </>
    );
}
