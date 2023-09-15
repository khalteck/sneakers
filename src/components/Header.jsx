import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { currentPage } = useAppContext();

  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    setOpenMenu((prevState) => !prevState);
  }

  return (
    <header
      className={`w-full h-[80px] bg-[#fefffe] text-gray-700 font-kumbh md:h-[100px] px-3 lg:px-[180px] items-center transition-all duration-700 fixed top-0 left-0 z-[999]`}
    >
      <div className="w-full h-full flex md:gap-20 lg:gap-[150px] justify-start border-b border-black/10">
        <div
          onClick={handleClick}
          className="flex flex-col gap-2 w-10 md:hidden cursor-pointer my-auto mr-auto"
        >
          <div className={`w-full h-1 bg-black rounded-lg`}></div>
          <div className={`w-full h-1 bg-black rounded-lg`}></div>{" "}
        </div>
        <Link to="/">
          <div className="flex gap-2 items-center h-full font-bold md:text-[2.5rem] text-black">
            We Sell
          </div>
        </Link>

        <ul className="h-full gap-6 text-[.9remrem] items-center hidden md:flex">
          <li
            onClick={() => navigate("/")}
            className={`h-full flex items-center cursor-pointer hover:text-[#fe7d1b] hover:border-[#fe7d1b] transition-all duration-300 border-b-4 ${
              currentPage === "/" ? "border-[#fe7d1b]" : "border-transparent"
            }`}
          >
            Collections
          </li>
          <li
            onClick={() => navigate("/about")}
            className={`h-full flex items-center cursor-pointer hover:text-[#fe7d1b] hover:border-[#fe7d1b] transition-all duration-300 border-b-4 ${
              currentPage === "/about"
                ? "border-[#fe7d1b]"
                : "border-transparent"
            }`}
          >
            About
          </li>

          <li
            // onClick={() => navigate("/contact")}
            className={`h-full flex items-center cursor-pointer hover:text-[#fe7d1b] hover:border-[#fe7d1b] transition-all duration-300 border-b-4 ${
              currentPage === "/contact"
                ? "border-[#fe7d1b]"
                : "border-transparent"
            }`}
          >
            Contact
          </li>
        </ul>
        <div className="md:gap-4 gap-3 items-center ml-auto flex">
          <div className="relative hover:scale-[1.1] cursor-pointer">
            <img alt="" src="/images/icon-cart.svg" className="w-6 h-6" />
          </div>
          <div className="relative bg-[#fe7d1b] p-1 rounded-full hover:scale-[1.1] cursor-pointer">
            <img
              alt=""
              src="/images/icons8-search-50-white.png"
              className="w-5 h-5"
            />
          </div>
          <div className="md:flex gap-2 hidden">
            <button
              //   onClick={() => navigate("/service")}
              className="w-fit bg-[#fe7d1b] hover:bg-white hover:text-[#fe7d1b] border border-[#fe7d1b] px-5 md:px-8 py-2 rounded-sm text-white font-medium transition-all duration-300"
            >
              Login
            </button>
            <button
              //   onClick={() => navigate("/contact")}
              className="w-fit hover:bg-[#fe7d1b] bg-white text-[#fe7d1b] border border-[#fe7d1b] px-5 md:px-8 py-2 rounded-sm hover:text-white font-medium transition-all duration-300 whitespace-nowrap"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        {openMenu && (
          <div className="w-full h-[100vh] z-[200] bg-black/80 fixed top-0 left-0 lg:hidden">
            <div
              onClick={() => {
                handleClick();
              }}
              className="w-fit h-fit p-2  bg-[#fefffe] rounded-full cursor-pointer mr-[25px] absolute top-4 left-4"
            >
              <img
                className="w-5 h-5  text-white"
                alt=""
                src="/images/icons8-close-50.png"
              />
            </div>
            <ul className="slide float-right w-full min-h-[150px] bg-[#4a044e] py-10 text-white gap-3 items-center md:hidden flex flex-col">
              <li
                onClick={() => {
                  handleClick();
                  navigate("/");
                }}
                className="py-2 uppercase"
              >
                Collections
              </li>

              <li
                onClick={() => {
                  handleClick();
                  navigate("/about");
                }}
                className="py-2 uppercase"
              >
                About
              </li>

              {/* <li
                onClick={() => {
                  handleClick();
                  navigate("/service");
                }}
                className="py-2 uppercase"
              >
                Contact
              </li> */}

              <li
                onClick={() => {
                  handleClick();
                  //   navigate("/contact");
                }}
                className="py-2 uppercase"
              >
                Contact
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
