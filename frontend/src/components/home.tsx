import type { JSX } from "react"
import { NavLink } from "react-router-dom"

export default function Home(): JSX.Element {
  return (

    <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to My Store</h1>
            <p className="text-gray-500 mb-6">Simple shopping experience</p>

            <NavLink to="/heropage">
            <button className="w-full bg-black text-white py-2 rounded-lg mb-6 hover:opacity-90 ">
                Browse Products
            </button>
            </NavLink>

            <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

            <div className="flex flex-col gap-3">
                <NavLink to="/heropage">
                <button className="w-full border rounded-lg py-2 hover:bg-gray-100 ">
                    Shop Products
                </button>
                </NavLink>

                <NavLink to="/cart">
                <button className="w-full border rounded-lg py-2 hover:bg-gray-100 ">
                    Go to Cart
                </button>
                </NavLink>
            </div>
            </div>

        </div>
    </div>
  )
}