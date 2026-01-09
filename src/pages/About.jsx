/* eslint-disable react/no-unescaped-entities */
import Header from "../components/Header";
import ScrollToTop from "../ScrollToTop";

const About = () => {
  return (
    <>
      <Header />
      <main className="h-[80px] mt-[50px] md:mt-[100px] w-full min-h-screen bg-[#fefffe] md:px-10 lg:px-[180px] font-kumbh">
        <section className="w-full px-3 md:px-0 pt-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-[600] text-[3rem] md:text-[4rem] text-[#fe7d1b] mb-8">
              About Shoply
            </h1>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Welcome to Shoply, your premier destination for the latest and
                greatest in sneaker fashion. We're passionate about bringing you
                an curated collection of footwear that combines style, comfort,
                and quality.
              </p>

              <div className="mt-10">
                <h2 className="font-[600] text-[2rem] text-black mb-4">
                  Our Story
                </h2>
                <p className="text-lg">
                  Founded with a love for sneakers and fashion, Shoply has grown
                  from a small passion project into a trusted online destination
                  for sneaker enthusiasts. We believe that the right pair of
                  shoes can transform not just your outfit, but your entire day.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="font-[600] text-[2rem] text-black mb-4">
                  What We Offer
                </h2>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className="text-[#fe7d1b] mr-3 text-2xl">•</span>
                    <span>Carefully curated collections from top brands</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#fe7d1b] mr-3 text-2xl">•</span>
                    <span>Competitive prices and regular promotions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#fe7d1b] mr-3 text-2xl">•</span>
                    <span>Fast and reliable shipping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#fe7d1b] mr-3 text-2xl">•</span>
                    <span>Dedicated customer support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="font-[600] text-[2rem] text-black mb-4">
                  Our Promise
                </h2>
                <p className="text-lg">
                  At Shoply, we're committed to providing an exceptional
                  shopping experience. From browsing our collections to
                  receiving your order, we ensure every step is seamless and
                  enjoyable. Your satisfaction is our top priority.
                </p>
              </div>

              <div className="mt-10 p-6 bg-[#fe7d1b]/10 border-l-4 border-[#fe7d1b] rounded">
                <p className="text-lg font-medium">
                  Thank you for choosing Shoply. We're excited to be part of
                  your sneaker journey!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full min-h-[300px]"></section>
      </main>
      <ScrollToTop />
    </>
  );
};

export default About;
