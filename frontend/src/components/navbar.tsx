import { useState } from "react"
import type { JSX } from "react"
import { NavLink } from "react-router-dom"
import "./navbar.css"

export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState(false)

  return (
    <>
      <nav className="navMain bg-white shadow-sm pt-3">
        <div className="wrapBox w-full px-4 flex items-center justify-between lg:block">

          <div className="flex items-center justify-between w-full lg:w-auto">

            <NavLink className="logoThing flex gap-3" to="/">
             <img className="logo items-center h-7"src="logo.png" alt="logo" />
             <p className="text-center">Movie watch List</p>
            </NavLink>

            <button className="btnToggle lg:hidden" onClick={() => setOpen(!open)} >
              <span className="text-2xl">☰</span>
            </button>

          <div className={`bigWrap ${open ? "block" : "hidden"} lg:flex lg:items-center lg:justify-between w-full`}>

            <ul className="centerList flex flex-col lg:flex-row lg:mx-auto gap-4 lg:gap-6 mt-4 lg:mt-0">

              <li className="itemOne">
                <NavLink className="linkA" to="/"> Home </NavLink>
              </li>

              <li className="itemTwo">
                <NavLink className="linkB text-(--text-dark)" to="/heropage">Products</NavLink>
              </li>

              <li className="itemThree">
                <NavLink className="linkC text-(--text-dark)" to="/cart">Cart</NavLink>
              </li>


            </ul>

            <div className="rightBtns flex items-center gap-2 mt-4 lg:mt-0">
                <NavLink to="/login">
                <button className="w-full bg-black text-white p-3 rounded-lg mb-6 hover:opacity-90"> Login </button>
                </NavLink>
            </div>

          </div>
          </div>

        </div>
      </nav>
    </>
  )
}