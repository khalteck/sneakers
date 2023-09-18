import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";
import SearchCard from "../components/SearchCard";

const Checkout = () => {
  const { cart, removeItem, openSearch } = useAppContext();

  function calcTotal() {
    let prices = [];

    cart?.forEach((each) => {
      const price = each?.item?.price;
      const quantity = each?.quantity;
      const total = price * quantity;

      prices?.push(Number(total?.toFixed(2)));
    });

    const sum = prices?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return sum?.toFixed(2);
  }

  const navigate = useNavigate();
  return (
    <>
      <Header />
      {openSearch && <SearchCard />}

      <main className="mt-[100px] w-full min-h-screen bg-[#fefffe] px-3 lg:px-[180px] md:pt-10">
        <h1 className="font-[600] text-[2rem]">Checkout</h1>

        <section
          id="collections"
          className="w-full md:w-[70%] px-3 md:px-0 pt-10 flex flex-col gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="w-fit mb-4 ml-auto bg-[#fe7d1b] hover:bg-white hover:text-[#fe7d1b] border border-[#fe7d1b] flex items-center justify-center gap-1 px-5 md:px-8 py-2 rounded-sm text-white font-medium transition-all duration-300"
          >
            Continue shopping
          </button>
          {cart?.map((item, index) => {
            return (
              <div
                key={index}
                // onClick={() => navigate(`/product/${item?.item?.id}`)}
                className="flex gap-3 mb-auto bg-gray-200/50 p-3 relative"
              >
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(index);
                  }}
                  alt=""
                  src="/images/icon-delete.svg"
                  className="w-5 h-5 absolute top-2 right-2 cursor-pointer hover:scale-[1.1]"
                />
                <img
                  alt=""
                  src={item?.item?.thumbnail}
                  className="w-12 h-12 object-cover border border-[#fe7d1b] "
                />
                <div className="">
                  <p className="font-bold">{item?.item?.title}</p>
                  <p className="text-[.85rem] font-medium">
                    ${item?.item?.price} x {item?.quantity} = $
                    {item?.item?.price * item?.quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <p className="text-[1.25rem] font-bold">
            {" "}
            Total amount: ${calcTotal()}
          </p>
          <button
            // onClick={() => navigate("/product/checkout")}
            className="w-fit mt-auto bg-[#fe7d1b] hover:bg-white hover:text-[#fe7d1b] border border-[#fe7d1b] flex items-center justify-center gap-1 px-5 md:px-8 py-2 rounded-sm text-white font-medium transition-all duration-300"
          >
            Proceed to payment
          </button>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Checkout;
