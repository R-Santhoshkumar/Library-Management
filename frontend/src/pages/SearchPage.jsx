import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNormalSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/search?q=${searchQuery}`);
      const data = await response.json();
      console.log("Normal Search Result:", data);

      // Navigate to the ResultPage with the search results
      navigate('/ResultPage', { state: { searchResult: data } });
    } catch (error) {
      console.error("Error during normal search:", error);
    }
  };



  return (
    <div className="w-full h-full flex flex-1 flex-col bg-white1 p-5 rounded-2xl min-h-fit shadow-2xl">
      <p className="text-[18px] indent-10">
        The Search can be made in different way like normal search and advanced
        search which is used to seacrh dynamically and helps to find the
        required book quickly as possible.
      </p>
      {/* <div className="w-full h-full rounded-2xl shadow-2xl p-3 bg-blue1 grid justify-center items-center text-xl">
          <center><label className="text-xl font-semibold">Add Book</label></center>
          <p className="indent-7 pb-4">Adding New Books to the Library.</p>
          <NavLink
            to="/LoginPage"
            className='w-full h-auto p-4 rounded-2xl flex flex-row justify-evenly bg-white1 text-black items-center hover:bg-top-blue hover:text-white shadow-lg hover:shadow-2xl transition ease-out duration-500 '
          >
            <label className="text-xl font-medium">Add Book</label>
          </NavLink>
        </div> */}
        {/* <div className="w-full h-full rounded-2xl shadow-2xl p-5 bg-blue1 grid justify-center items-center text-xl">
        <center><label className="text-2xl font-semibold">Delete Book</label></center>
          <p className="indent-7 pb-4">Delete the exsisting Books from the Library.</p>
          <NavLink
            to="/"
            className={'w-full h-auto p-4 rounded-2xl flex flex-row justify-evenly bg-white1 text-black items-center hover:bg-top-blue hover:text-white shadow-lg hover:shadow-2xl transition ease-out duration-500 '}
          >
            <label className="text-xl font-medium">Delete Book</label>
          </NavLink>
        </div> */}
      <div className="w-full h-full grid grid-rows-2 gap-4 p-3">
        <div className="w-full h-auto rounded-2xl shadow-2xl p-3 bg-blue1 flex flex-col justify-center items-center text-xl">
          <center>
            <label className="text-2xl font-semibold">Normal Search</label>
          </center>
          <p className="indent-7 pb-3">Directly search the book name.</p>
          <div className="w-full h-auto flex flex-row bg-white1 rounded-full p-3 shadow-lg">
            <div className="w-auto h-auto  border-2 border-top-blue rounded-full p-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 text-top-blue"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <form className="w-full inline-flex" onSubmit={handleNormalSearch}>
              <div className="w-full h-full px-2">
                <input
                  type="text"
                  placeholder="Search with the book name"
                  className="w-full h-auto bg-white1 h-full px-2 border-transparent focus:border-transparent focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Search"
                className="bg-blue1 px-4 rounded-full justify-center items-center hover:bg-top-blue hover:text-white hover:cursor-pointer"
              ></input>
            </form>
          </div>
        </div>
        <div className="w-full h-full rounded-2xl shadow-2xl p-5 bg-blue1 grid justify-center items-center text-xl">
          <center>
            <label className="text-2xl font-semibold">Advanced Search</label>
          </center>
          <p className="indent-7 pb-4">
            Searching by specifying the particular information like
            Name,Publisher,ISBN etc.
          </p>
          <NavLink
            to="/Search/AdvancedSearch"
            className={
              "w-full h-auto p-3 rounded-2xl flex flex-row justify-center bg-white1 text-black items-center hover:bg-top-blue hover:text-white shadow-lg hover:shadow-2xl transition ease-out duration-500 "
            }
          >
            <label className="text-xl font-medium">Advanced Search</label>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
