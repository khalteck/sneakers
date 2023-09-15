import Header from "../components/Header";
import ScrollToTop from "../ScrollToTop";

const Details = () => {
  return (
    <>
      <Header />
      <main className="mt-[100px] w-full min-h-screen bg-[#fefffe] px-3 lg:px-[180px]">
        <h1>This is the Details</h1>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Details;
