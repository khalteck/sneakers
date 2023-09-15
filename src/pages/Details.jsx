/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "../components/capitalize";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const Details = () => {
  const { data, addToCart, cart, removeItem, currentPage } = useAppContext();

  const { id } = useParams();

  const currentProduct = data?.filter((item) => item?.id === Number(id))[0];

  // console.log("currentProduct", currentProduct);

  function calculatePercent(number, percent) {
    const result = (number * percent) / 100;
    return result;
  }

  //======================================================to handle image display
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(currentProduct?.images[index]);

  useEffect(() => {
    setImage(currentProduct?.images[index]);
  }, [index, currentPage]);

  function next() {
    const lastIndex = currentProduct?.images?.length - 1;
    if (image === currentProduct?.images[lastIndex]) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  function prev() {
    const lastIndex = currentProduct?.images?.length - 1;
    if (image === currentProduct?.images[0]) {
      setIndex(lastIndex);
    } else {
      setIndex((prev) => prev - 1);
    }
  }

  //===============================================to handle quantity
  const itemExixtsInCart = cart?.filter(
    (x) => x?.item?.id === currentProduct?.id
  )[0];
  const [itemToAdd, setItemToAdd] = useState({
    quantity: itemExixtsInCart ? itemExixtsInCart?.quantity : 1,
    item: currentProduct,
  });

  function increase() {
    setItemToAdd((prev) => ({
      ...prev,
      quantity:
        prev.quantity < currentProduct?.stock
          ? prev.quantity + 1
          : prev.quantity,
    }));
    if (itemExixtsInCart) {
      addToCart(itemToAdd);
    }
  }

  function decrease() {
    setItemToAdd((prev) => ({
      ...prev,
      quantity: prev.quantity > 0 ? prev.quantity - 1 : 0,
    }));
  }

  function handleAddItem() {
    if (itemExixtsInCart) {
      const index = cart?.findIndex((x) => x?.item?.id === currentProduct?.id);
      removeItem(index);
    } else {
      addToCart(itemToAdd);
    }
  }

  return (
    <>
      <Header />
      <main className="mt-[100px] w-full min-h-screen bg-[#fefffe] md:px-10 lg:px-[180px] pb-12 font-kumbh text-black">
        <section className="w-full flex md:flex-row flex-col gap-12 items-center md:pt-12 px-3">
          <div className="w-full flex flex-col gap3">
            <p className="font-bold text-[2rem] mb-3 md:hidden">
              {capitalize(currentProduct?.title)}
            </p>
            <div className="relative">
              <div className="w-full absolute top-[50%] translate-y-[-50%] flex justify-between">
                <div
                  onClick={prev}
                  className="w-10 h-10 flex justify-center items-center cursor-pointer border-2 border-[#fe7d1b] bg-white"
                >
                  <img
                    alt=""
                    src="/images/icon-previous.svg"
                    className="w-3 h-3"
                  />
                </div>
                <div
                  onClick={next}
                  className="w-10 h-10 flex justify-center items-center cursor-pointer border-2 border-[#fe7d1b] bg-white"
                >
                  <img alt="" src="/images/icon-next.svg" className="w-3 h-3" />
                </div>
              </div>
              <img
                alt=""
                src={image}
                className="w-full min-w-[200px] h-[400px] object-cover border-4 border-[#fe7d1b] rounded-sm"
              />
            </div>
            <div className="w-full flex flex-wrap gap-3 mt-4">
              {currentProduct?.images?.map((itm, idx) => {
                return (
                  <img
                    key={idx}
                    alt=""
                    src={itm}
                    onClick={() => setImage(itm)}
                    className={`w-[100px] h-[100px] object-cover border-4 cursor-pointer hover:opacity-50 rounded-sm ${
                      itm === image
                        ? "border-[#fe7d1b]"
                        : "border-gray-500/70 opacity-80"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 relative">
            <div className="text-[1rem] font-bold text-[#fe7d1b] bg-[#fe7d1b]/30 rounded-sm px-5 py-2 w-fit h-fit absolute top-0 right-0">
              <p>{currentProduct?.category}</p>
            </div>
            <h1 className="font-bold text-[.85rem] uppercase text-[#fe7d1b]">
              {currentProduct?.brand}
            </h1>
            <p className="font-bold text-[2rem]">
              {capitalize(currentProduct?.title)}
            </p>
            <p>{currentProduct?.description}</p>
            <div>
              <div className="font-bold text-[1.1rem] flex gap-3 items-center">
                <p className="text-[1.75rem]">
                  ${currentProduct?.price?.toFixed(2)}
                </p>
                <div className="text-[.75rem] font-bold bg-[#fe7d1b]/30 px-3 w-fit h-fit border border-white text-[#fe7d1b]">
                  <p>{currentProduct?.discountPercentage?.toFixed(0)}%</p>
                </div>
              </div>
              <div className="text-gray-400 font-bold relative h-fit w-fit">
                <div className="w-full h-[1px] absolute top-[50%] bg-gray-400"></div>
                <p>
                  $
                  {(
                    currentProduct?.price +
                    calculatePercent(
                      currentProduct?.price,
                      currentProduct?.discountPercentage
                    )
                  )?.toFixed(2)}
                </p>
              </div>

              <p>
                Rating:{" "}
                <span className="font-medium">{currentProduct?.rating}</span>
              </p>
              <p className="text-[.85rem]">
                <span className="font-medium">{currentProduct?.stock}</span>{" "}
                items left
              </p>
            </div>

            <p>
              Added to cart, quantity:{" "}
              <span className="font-bold">{itemToAdd?.quantity}</span>
            </p>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div
                className={`w-[150px] md:w-[200px] h-[45px] flex bg-gray-100 border border-black/20 rounded-sm ${
                  itemExixtsInCart && "opacity-50 cursor-not-allowed"
                }`}
              >
                <div
                  onClick={decrease}
                  className={`w-full h-full flex justify-center items-center hover:bg-gray-200 ${
                    itemExixtsInCart ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <img
                    alt=""
                    src="/images/icon-minus.svg"
                    className="w-4 h-auto"
                  />
                </div>
                <div className="w-full h-full flex justify-center items-center">
                  {itemToAdd?.quantity}
                </div>
                <div
                  onClick={increase}
                  className={`w-full h-full flex justify-center items-center hover:bg-gray-200 ${
                    itemExixtsInCart ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <img
                    alt=""
                    src="/images/icon-plus.svg"
                    className="w-4 h-auto"
                  />
                </div>
              </div>
              <button
                onClick={handleAddItem}
                className={`w-full border border-[#fe7d1b] flex items-center justify-center gap-1 px-5 md:px-8 py-2 rounded-sm text-white font-medium transition-all duration-300 ${
                  itemToAdd?.quantity === 0
                    ? "bg-[#fe7d1b]/50 cursor-not-allowed"
                    : "bg-[#fe7d1b]  hover:bg-white hover:text-[#fe7d1b]"
                }`}
              >
                <div className="w-fit h-fit rounded-full bg-gray-100 p-1">
                  {" "}
                  <img
                    alt=""
                    src="/images/icon-cart.svg"
                    className="w-4 h-auto"
                  />
                </div>{" "}
                {itemExixtsInCart ? "Remove from cart" : "Add to cart"}
              </button>
            </div>
            {itemExixtsInCart && (
              <p>*Remove from cart before changing quantity</p>
            )}
          </div>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Details;
