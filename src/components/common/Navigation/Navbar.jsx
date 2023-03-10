import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./extra/themeSwitcher";
import { useSelector } from "react-redux";
import logo from "../../../assets/brand/logo.svg"
import logo_dark from "../../../assets/brand/logo_dark.svg"

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useSelector((state) => state.theme);

  const onKeyDownHandler = (e) => {
    searchQuery != ""
      ? navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`)
      : alert("Please enter a valid search query");
  };

  const onChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full h-16 ">
      <div className="w-full h-16  flex items-center relative justify-center">
        <header className="h-16 w-full flex px-5  relative bg-slate-200/80  dark:bg-slate-800 text-white justify-between">
          <div
            className="flex items-center justify-center text-slate-900 md:text-xl font-bold dark:text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* <CgPlayButtonO className="text-2xl mr-2" />| ViewCord */}
            {theme === "dark" ? <img src={logo_dark} alt="logo" className="h-8 w-8 mr-2" /> : <img src={logo} alt="logo" className="h-8 w-8 mr-2" />}| ViewCord
          </div>
          <div className="h-[42px] m-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onKeyDownHandler();
              }}
            >
              <div className="relative flex-row rounded-full hidden sm:flex overflow-hidden">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={onChangeHandler}
                  id="default-search"
                  className="block w-full min-w-[320px] h-[40px] pl-4  text-sm text-gray-800  bg-slate-300  dark:bg-slate-700  outline-none 
         dark:placeholder-slate-400 dark:text-white  placeholder:text-gray-600"
                  placeholder="Get something to watch"
                />

                <button className="flex w-[68px] h-[40px] items-center justify-center bg-slate-400 dark:bg-slate-900  border-l-1 cursor-pointer">
                  <HiSearch
                    className=" text-neutral-800 dark:text-white "
                    size={24}
                  />
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-0">
            <HiSearch
              className="sm:hidden text-neutral-800 dark:text-white cursor-pointer"
              size={24}
            />
            <ThemeSwitcher />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
