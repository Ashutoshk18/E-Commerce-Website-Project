import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (<div>
    <div className="text-2xl text-center pt-8 border-t">
      <Title text1="About" text2="Us" />
      
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-16">
      <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />

      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
      <p>Welcome to our fashion store, where style meets quality. We are passionate about bringing you the latest trends and timeless classics that help you express your unique personality. Our carefully curated collection features premium materials and expert craftsmanship, ensuring every piece you choose becomes a cherished part of your wardrobe.</p>
      <p>At our store, we believe fashion is more than just clothing - it's a form of self-expression and confidence. We work with trusted designers and manufacturers to bring you pieces that are not only beautiful but also durable and comfortable. Whether you're looking for everyday essentials or statement pieces for special occasions, we have something special waiting for you.</p>

      <b className="text-gray-800">Our Mission</b>
      <p>Our mission is to empower individuals to express their authentic style through high-quality fashion that combines contemporary trends with classic elegance. We strive to create an inclusive shopping experience where everyone can find pieces that make them feel confident and beautiful, while maintaining our commitment to sustainable practices and ethical sourcing.</p>
      </div>
    </div>

    <div className="xl py-4">
      <Title text1={"Why"} text2={"Choose Us"}></Title>
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className="text-gray-600">Every product in our collection undergoes rigorous quality checks to ensure it meets our high standards. We source materials from trusted suppliers and work closely with manufacturers who share our commitment to excellence. Our quality control process includes detailed inspections of fabric, stitching, and finishing, guaranteeing that you receive only the finest garments that will stand the test of time.</p>
      </div>

      <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
        <b>Convenience:</b>
        <p className="text-gray-600">We've designed our shopping experience to be as seamless and convenient as possible. Enjoy fast and reliable shipping, easy returns and exchanges, and a user-friendly website that makes finding your perfect style effortless. Our customer service team is always ready to assist you, and we offer multiple payment options to make your purchase process smooth and secure.</p>
      </div>

      <div className="border px-10 md:px-16 sm:py-20 flex flex-col gap-5">
        <b>Exceptional Customer Service:</b>
        <p className="text-gray-600">Our dedicated customer service team is here to help you every step of the way. Whether you need assistance with sizing, styling advice, or have questions about your order, we're committed to providing prompt, friendly, and personalized support. We value your satisfaction and strive to exceed your expectations with every interaction, ensuring your shopping experience is nothing short of exceptional.</p>
      </div>
    </div>

    <NewsLetterBox/>
  </div>);
};

export default About;
// next contact page:- 5:03:19