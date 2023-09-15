import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CartCont = ({ cart, handleOpenCart, removeItem }) => {
  const navigate = useNavigate();

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

  return (
    <div className="absolute top-[80px] right-0 md:right-[100px] w-full md:w-[400px] max-h-[500px] overflow-y-auto shadow-xl bg-inherit">
      <h1 className="font-bold text-[1.25rem] py-2 px-3 border-b border-black/20 flex justify-between items-center">
        Cart ({cart?.length})
        <img
          onClick={handleOpenCart}
          alt=""
          src="/images/icon-close.svg"
          className="w-5 h-5 cursor-pointer hover:scale-[1.1]"
        />
      </h1>
      {cart?.length === 0 && (
        <div className="w-full h-[100px] flex justify-center items-center text-gray-300 font-medium">
          Nothing yet..
        </div>
      )}
      {cart?.length > 0 && (
        <div className="w-full min-h-[200px] justify-between p-3 flex flex-col gap-3 mb-4">
          {cart?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/product/${item?.item?.id}`)}
                className="flex gap-3 mb-auto bg-gray-200/50 p-3 relative cursor-pointer hover:bg-gray-200/90"
              >
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(index);
                  }}
                  alt=""
                  src="/images/icon-delete.svg"
                  className="w-5 h-5 absolute top-1 right-1 cursor-pointer hover:scale-[1.1]"
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
            onClick={() => navigate("/product/checkout")}
            className="w-full mt-auto bg-[#fe7d1b] hover:bg-white hover:text-[#fe7d1b] border border-[#fe7d1b] flex items-center justify-center gap-1 px-5 md:px-8 py-2 rounded-sm text-white font-medium transition-all duration-300"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartCont;
