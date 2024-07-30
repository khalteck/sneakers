import { useAppContext } from "../contexts/AppContext";

const SearchCard = () => {
  const { toggleSearch, handleSearch, setsearchTerm, searchTerm } =
    useAppContext();
  return (
    <div className="w-full min-h-screen bg-black/90 fixed top-0 left-0 flex justify-center py-[200px] px-3 z-[999]">
      <div className="w-full md:w-[550px] h-fit bg-white rounded-sm p-3 flex flex-col gap-3 relative slide">
        <div
          onClick={() => {
            toggleSearch();
          }}
          className="w-fit h-fit p-2 bg-[#fe7d1b] rounded-full cursor-pointer mr-[25px] absolute top-2 right-[-20px]"
        >
          <img
            className="w-4 h-4  text-white"
            alt=""
            src="/images/icons8-close-50.png"
          />
        </div>
        <h1>Search for item</h1>
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className="w-full p-2 border border-[#fe7d1b] outline-none"
            placeholder="E.g iphone"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="w-fit bg-[#fe7d1b] hover:bg-white hover:text-[#fe7d1b] border border-[#fe7d1b] px-5 md:px-8 py-2 mt-4 rounded-sm text-white font-medium transition-all duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchCard;
