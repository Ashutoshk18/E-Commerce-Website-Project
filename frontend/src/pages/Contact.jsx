import React, { useState } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="Contact" text2="Us" />
      </div>

      <div className="my-10">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <b className="text-gray-800 text-lg">Get in Touch</b>
            <p className="text-gray-600">
              Have a question or need assistance? We're here to help! Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black resize-none"
              required
            />
            <button
              type="submit"
              className="bg-black text-white py-3 px-8 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>

      <div className="my-16 border-t pt-10">
        <Title text1="Contact" text2="Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col gap-3">
            <b className="text-gray-800">Address</b>
            <p className="text-gray-600">
              123 Fashion Street<br />
              Style District, City 12345<br />
              Country
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <b className="text-gray-800">Phone</b>
            <p className="text-gray-600">
              +1 (555) 123-4567<br />
              +1 (555) 123-4568
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <b className="text-gray-800">Email</b>
            <p className="text-gray-600">
              info@fashionstore.com<br />
              support@fashionstore.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
