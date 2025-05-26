// ContactUs.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 justify-center py-6 relative top-[-0.2in]">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form Section */}
          <div className="lg:col-span-2 bg-white p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Get in touch and let us know how we can help. Have a question or
              not sure who to contact? Get in touch and a member of our team
              will reach out to you.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 h-32 resize-none"
              ></textarea>
              {/* <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
                SEND
              </button> */}
              <button className="bg-black text-white text-sm font-semibold px-4 py-2 hover:bg-gray-600 transition cursor-pointer">
                SEND
              </button>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gray-50 p-6 h-69 shadow-md">
            <p className="text-gray-700 mb-2">
              <strong>ADDRESS:</strong> Yenzeghanamall, Osu Nyaniba Estates
            </p>
            <p className="text-gray-700 mb-2">
              <strong>WHATSAPP:</strong> +92 333 4659 208
            </p>
            <p className="text-gray-700 mb-2">
              <strong>EMAIL:</strong> info@hapriannaturals.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Opening Hours:</strong>
            </p>
            <p className="text-gray-700 mb-2">Mon - Sat: 8am - 11pm</p>
            <p className="text-gray-700 mb-2">
              <strong>Stay Connected</strong>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-6">
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">
              [Map Placeholder - Yenzeghanamall, Osu Nyaniba Estates]
            </p>
          </div>
        </div> */}

        {/* Google Map */}
        <div className=" mt-12 mb-12 h-96 w-full">
          <div className="border border-[#D4E4D8] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15908.263437618197!2d-0.1736853871581949!3d5.5593899999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzMnMzQuMiJOIDDCsDEwJzIyLjciV1c!5e0!3m2!1sen!2sus!4v1698180000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
