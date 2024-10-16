import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaWhatsapp, FaTelegram } from "react-icons/fa";
const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      {/* <a href="whatsapp:contact=+237697995579@s.whatsapp.com&message=I'd like to chat with you"><img src="/images/zap.jpg" className = "w-5 h-5"/></a> 
      <a href="https://t.me/@berln1441"><img src="/images/th2.jpg" className = "w-5 h-5"/></a> */}
      <ul className="flex items-center gap-2">
        <a href="https://t.me/berlin1441" target="_blank" rel="noreferrer" >
          <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
            <FaTelegram />
          </li>
        </a>
        <a href="https://wa.me/697995579" target="_blank" rel="noreferrer" >
          <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
            <FaWhatsapp />
          </li>
        </a>
        <a href="/facebook.com" target="_blank" rel="noreferrer" >
          <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
            <FaFacebook />
          </li>
        </a>
      </ul>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
