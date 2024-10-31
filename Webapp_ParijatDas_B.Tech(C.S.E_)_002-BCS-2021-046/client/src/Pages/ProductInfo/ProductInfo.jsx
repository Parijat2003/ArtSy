import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import MyContext from '../../context/MyContext';
import cartContext from "../../context/cartContext"
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FireBaseConfig';

const ProductInfo = () => {
  const [product, setProduct] = useState(null);
  const context = useContext(MyContext);
  const { loading, setloading } = context;
  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart } = useContext(cartContext); // access addToCart and removeFromCart

  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item.id === id);

  const getProductData = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct(productTemp.data());
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(id); // Remove product if it's already in cart
    } else {
      addToCart({ ...product, id }); // Add product to cart
    }
  };

  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <img
                className="w-full lg:h-[39em] rounded-lg"
                src={product?.productImageUrl}
                alt={product.title}
              />
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                  {product?.title}
                </h2>
                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                  ₹{product?.price}
                </p>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Description:
                  </h2>
                  <p>{product?.description}</p>
                </div>
                <button
                  className={`w-full px-4 py-3 text-center border rounded-xl ${
                    isInCart
                      ? "bg-gray-100 text-gray-700 border-gray-600 hover:bg-gray-600 hover:text-gray-100"
                      : "bg-pink-100 text-pink-600 border-pink-600 hover:bg-pink-600 hover:text-gray-100"
                  }`}
                  onClick={handleCartAction}
                >
                  {isInCart ? "Remove from cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
