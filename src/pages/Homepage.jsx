/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { capitalize } from "../components/capitalize";
import Header from "../components/Header";
import Slider from "../components/Slider";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const Homepage = () => {
  const { fetchData, data } = useAppContext();

  useEffect(() => {
    if (data?.length === 0) {
      fetchData();
    }
  }, []);

  function groupByCategory() {
    return data?.reduce((result, item) => {
      const index = result.findIndex(
        (group) => group.length > 0 && group[0].category === item.category
      );

      if (index !== -1) {
        result[index].push(item);
      } else {
        result.push([item]);
      }

      return result;
    }, []);
  }

  const products = groupByCategory();

  console.log("data", groupByCategory());

  return (
    <>
      <Header />
      <main className="h-[80px] md:mt-[100px] w-full min-h-screen bg-[#fefffe] md:px-10 lg:px-[180px] font-kumbh">
        <section className="w-full">
          <Slider />
        </section>
        <section id="collections" className="w-full px-3 md:px-0 pt-10">
          {products?.map((item, index) => {
            return (
              <div key={index} className="mt-10">
                <h1 className="font-[600] text-[2rem]">
                  {capitalize(item[0]?.category)}
                </h1>
                <div className="w-full flex gap-3 whitespace-nowrap overflow-x-auto mt-5 border-t border-[#fe7d1b] pt-4 product-cont">
                  {item?.map((itm, idx) => {
                    return (
                      <div
                        key={idx}
                        className="w-[280px] h-full flex gap-3 flex-col p-3 bg-[#fe7d1b]/10 cursor-pointer hover:border-[#fe7d1b] border hover:opacity-80 transition-all duration-300 relative"
                      >
                        <img
                          alt=""
                          src={itm?.thumbnail}
                          className="w-full h-[220px] object-cover rounded-sm"
                        />
                        <p className="font-medium min-h-[50px]">
                          {capitalize(itm?.title)}
                        </p>
                        <div>
                          <p className="font-bold text-[1.1rem]">$125.00</p>
                          <p>
                            Rating: <span className="font-medium">3.9</span>
                          </p>
                        </div>
                        <p className="text-[.75rem] bg-white p-1 w-fit absolute top-[195px] left-5">
                          50 items left
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <section className="w-full min-h-[300px]"></section>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Homepage;
