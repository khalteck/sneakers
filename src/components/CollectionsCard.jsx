import { useAppContext } from "../contexts/AppContext";
import PropTypes from "prop-types";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const CollectionsCard = ({ collections }) => {
  const { setDisplayCollection } = useAppContext();

  function handleScrollTo(id) {
    const element = document.getElementById(id);
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  return (
    <div className="w-full min-h-screen bg-black/90 fixed top-0 left-0 flex justify-center py-[200px] px-3 z-[999]">
      <div className="w-full md:w-[550px] h-fit bg-white rounded-sm p-3 flex flex-col gap-3 relative slide">
        <div
          onClick={() => {
            setDisplayCollection(false);
          }}
          className="w-fit h-fit p-2 bg-[#fe7d1b] rounded-full cursor-pointer mr-[25px] absolute top-2 right-[-20px]"
        >
          <img
            className="w-4 h-4  text-white"
            alt=""
            src="/images/icons8-close-50.png"
          />
        </div>
        <h1>Collections</h1>

        <div className="w-full mt-5 flex flex-col gap-2">
          {collections?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleScrollTo(item);
                  setDisplayCollection(false);
                }}
                className="w-full p-2 rounded-sm cursor-pointer bg-orange-100 text-[.85rem]"
              >
                {capitalizeFirstLetter(item)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CollectionsCard.propTypes = {
  collections: PropTypes.array.isRequired,
};

export default CollectionsCard;
