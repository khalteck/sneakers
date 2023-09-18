/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";
import { useEffect } from "react";

const SearchPage = () => {
  const { searchData, searchTerm } = useAppContext();

  useEffect(() => {
    if (!searchTerm) {
      navigate("/");
    }
  }, [searchTerm]);

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="mt-[100px] w-full min-h-screen bg-[#fefffe] px-3 lg:px-[180px]">
        <section className="w-full mt-10 flex flex-col gap-3">
          <h1 className="font-[600] text-[1.5rem] md:text-[2rem] mt-5">
            Search result for "{searchTerm}"
          </h1>
          <div className="w-full flex flex-col gap-3">
            {searchData?.length === 0 && <div>No result found..</div>}
            {searchData?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => navigate(`/product/${item?.id}`)}
                  className="flex gap-3 mb-auto bg-gray-200/50 p-3 relative cursor-pointer"
                >
                  <img
                    alt=""
                    src={item?.thumbnail}
                    className="w-12 h-12 object-cover border border-[#fe7d1b] "
                  />
                  <div className="">
                    <p className="font-bold">{item?.title}</p>
                    <p className="text-[.85rem] font-medium">${item?.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
};

export default SearchPage;
