/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { capitalize } from "../components/capitalize";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";
import SearchCard from "../components/SearchCard";

const Homepage = () => {
  const { fetchData, data, openSearch } = useAppContext();

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

  function calculatePercent(number, percent) {
    const result = (number * percent) / 100;
    return result;
  }

  return (
    <>
      <Header />
      {openSearch && <SearchCard />}
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
                      <ProductCard
                        key={idx}
                        itm={itm}
                        calculatePercent={calculatePercent}
                      />
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
