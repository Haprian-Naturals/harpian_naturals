import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (This is a placeholder action)");
    console.log(formData);
    setFormData({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-[#8CC63F]">
              Home
            </a>{" "}
            | <span className="text-gray-800">Contact</span>
          </nav>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A3C34] text-center uppercase mb-4">
          Contact Us
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Get in touch and let us know how we can help. Have a question but
          aren’t sure who to contact? Get in touch and a member of our team will
          reach out to you.
        </p>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="5"
                className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#003087] text-white text-sm font-semibold px-6 py-2 uppercase hover:bg-[#4A6BFF] transition-colors duration-300"
              >
                SEND
              </button>
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-12 max-w-2xl mx-auto space-y-6">
          {/* Contact Info */}
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#1A3C34] uppercase">
                Address:
              </span>{" "}
              Yenze Ghana Mall, Osu Nyaniba Estates, Accra, Ghana
              <br />
              <span className="font-semibold text-[#1A3C34] uppercase">
                WhatsApp:
              </span>{" "}
              +233 123 456 789
              <br />
              <span className="font-semibold text-[#1A3C34] uppercase">
                Email:
              </span>{" "}
              hapriannaturals@gmail.com
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A3C34] mb-2">
              Opening Hours
            </h3>
            <p className="text-sm text-gray-600">Mon - Sat: 9am - 9pm</p>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-lg font-semibold text-[#1A3C34] mb-2">
              Stay Connected
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-[#8CC63F] transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-[#8CC63F] transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.285.058-2.567.28-3.768 1.482-1.202 1.202-1.424 2.484-1.482 3.768-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.285.28 2.567 1.482 3.768 1.202 1.202 2.484 1.424 3.768 1.482 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.285-.058 2.567-.28 3.768-1.482 1.202-1.202 1.424-2.484 1.482-3.768.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.285-.28-2.567-1.482-3.768-1.202-1.202-2.484-1.424-3.768-1.482-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-[#8CC63F] transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 011.19.26V9.54a6.29 6.29 0 00-1.32-.14A6.34 6.34 0 003 15.88a6.34 6.34 0 0010.69 4.59 6.34 6.34 0 001.88-4.54V9.81a8.23 8.23 0 004.83 1.56V7.92a4.82 4.82 0 01-1.81-1.23z" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-[#8CC63F] transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.87.52 3.63 1.41 5.14L2 22l4.86-1.41A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3.79 14.85c-.22.62-.88 1.04-1.5 1.15-.62.11-1.5.04-2.14-.33-.63-.37-1.15-.96-1.62-1.58-.47-.62-.83-1.31-.99-2.05-.16-.74-.04-1.5.33-2.12.37-.62 1-.96 1.62-1.04.62-.07 1.15.11 1.58.44.43.33.74.81 1.04 1.36.3.55.37 1.15.22 1.77-.15.62-.55 1.15-1.04 1.58zm-1.15-2.12c-.07-.11-.15-.22-.26-.37-.11-.15-.22-.33-.37-.55-.15-.22-.26-.44-.33-.74-.07-.3-.07-.62 0-.96.07-.33.22-.66.44-.92.22-.26.55-.44.88-.55.33-.11.7-.11 1.04 0 .33.11.62.33.88.55.26.22.44.55.55.88.11.33.11.7 0 1.04-.11.33-.33.62-.55.88-.22.26-.55.44-.88.55-.33.11-.7.11-1.04 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-[#1A3C34] mb-4 text-center">
              Find Us
            </h3>
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
    </div>
  );
};

export default Contact;
