import "./footer.css"

export default function Footer() {
  return (
    <footer>
       <div className="footer">
      <div className="footer-container max-w-7xl mx-auto p-4 grid grid-cols-3">
          <div className="footer-section1 flex flex-col gap-4">
            <img src="logo.png" alt="logo" />
            <p>MOVIE WATCHLIST APP</p>
            <p>add to watch list and play at free time</p>
          </div>
          <div className="links flex flex-col gap-4">
            <h1>Important Links</h1>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Watch List</a>
              </li>
              <li>
                <a href="#">Watched</a>
              </li>
            </ul>
          </div>
          <div className="Contact flex flex-col gap-4">
            <h1>Contact</h1>
            <p>Phone : </p>
            <p>Email : </p>
          </div>
        </div>
        <div className="footer-section2 text-center text-sm text-gray-400 border-t border-gray-700 py-3 ">
          <p>@2026 Movie Watchlist App — All rights reserved</p>
        </div>

      </div>
    </footer>
  )
}


// import "./footer.css"

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="footer-container max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="footer-section1">
//           <img src="logo.png" alt="logo" className="mb-2 w-12" />
//           <p className="font-semibold">MOVIE WATCHLIST APP</p>
//           <p className="text-sm text-gray-400">
//             add to watch list and play at free time
//           </p>
//         </div>

//         <div className="links">
//           <h1 className="font-semibold mb-2">Important Links</h1>
//           <ul className="space-y-1 text-gray-300">
//             <li><a href="#">Home</a></li>
//             <li><a href="#">Watch List</a></li>
//             <li><a href="#">Watched</a></li>
//           </ul>
//         </div>

//         <div className="contact">
//           <h1 className="font-semibold mb-2">Contact</h1>
//           <p className="text-gray-300">Phone :</p>
//           <p className="text-gray-300">Email :</p>
//         </div>

//       </div>

//       <div className="text-center text-sm text-gray-400 border-t border-gray-700 py-3">
//         <p>© 2026 Movie Watchlist App — All rights reserved</p>
//       </div>
//     </footer>
//   )
// }