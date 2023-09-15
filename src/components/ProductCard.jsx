import { useNavigate } from "react-router-dom";
import { capitalize } from "./capitalize";

/* eslint-disable react/prop-types */
const ProductCard = ({ itm, calculatePercent }) => {
  const navigate = useNavigate();
  function link() {
    navigate(`/product/${itm?.id}`);
  }

  return (
    <div
      onClick={link}
      className="w-[280px] h-full flex gap-3 flex-col p-3 bg-[#fe7d1b]/10 hover:bg-[#fe7d1b] cursor-pointer hover:border-[#fe7d1b] border hover:opacity-80 transition-all duration-300 relative"
    >
      <img
        alt=""
        src={itm?.thumbnail}
        className="w-full min-w-[200px] h-[220px] object-cover rounded-sm"
      />
      <p className="font-medium min-h-[50px] whitespace-normal">
        {capitalize(itm?.title)}
      </p>
      <div>
        <div className="font-bold text-[1.1rem] flex gap-3 items-center">
          <p>${itm?.price?.toFixed(2)}</p>
          <div className="text-[.75rem] font-bold bg-[#fe7d1b]/30 px-1 w-fit h-fit border border-white">
            <p>{itm?.discountPercentage?.toFixed(0)}%</p>
          </div>
        </div>
        <div className="text-gray-400 font-bold relative h-fit w-fit">
          <div className="w-full h-[1px] absolute top-[50%] bg-gray-400"></div>
          <p>
            $
            {(
              itm?.price + calculatePercent(itm?.price, itm?.discountPercentage)
            )?.toFixed(2)}
          </p>
        </div>

        <p>
          Rating: <span className="font-medium">{itm?.rating}</span>
        </p>
      </div>
      <p className="text-[.75rem] bg-white p-1 w-fit absolute top-[195px] left-5 border border-[#fe7d1b]/50">
        <span className="font-bold">{itm?.stock}</span> items left
      </p>
    </div>
  );
};

export default ProductCard;
