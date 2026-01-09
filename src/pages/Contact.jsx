/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Header from "../components/Header";
import ScrollToTop from "../ScrollToTop";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      <main className="h-[80px] mt-[50px] md:mt-[100px] w-full min-h-screen bg-[#fefffe] md:px-10 lg:px-[180px] font-kumbh">
        <section className="w-full px-3 md:px-0 pt-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-[600] text-[3rem] md:text-[4rem] text-[#fe7d1b] mb-8">
              Contact Us
            </h1>

            <div className="grid md:grid-cols-2 gap-10 mb-12">
              <div className="space-y-6">
                <h2 className="font-[600] text-[2rem] text-black mb-4">
                  Get In Touch
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Have questions about our products, your order, or just want to
                  say hello? We'd love to hear from you! Fill out the form and
                  we'll get back to you as soon as possible.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#fe7d1b] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-[600] text-lg">Email</h3>
                      <p className="text-gray-600">support@shoply.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#fe7d1b] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-[600] text-lg">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#fe7d1b] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-[600] text-lg">Hours</h3>
                      <p className="text-gray-600">Mon-Fri: 9AM - 6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-3xl">✓</span>
                    </div>
                    <h3 className="font-[600] text-2xl text-green-600">
                      Thank You!
                    </h3>
                    <p className="text-gray-700">
                      Your message has been sent successfully. We'll get back to
                      you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe7d1b] focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe7d1b] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe7d1b] focus:border-transparent"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fe7d1b] focus:border-transparent resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#fe7d1b] hover:bg-[#e66d0b] text-white font-medium py-3 rounded-md transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                )}
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

export default Contact;
