import { useContext } from "react";
import { useNavigate } from "react-router";
import MyContext from "../../context/MyContext";
import CartContext from "../../context/cartContext"; // Import CartContext

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const { getAllProduct } = useContext(MyContext);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext); // Destructure addToCart and removeFromCart from CartContext

    const handleCartToggle = (item) => {
        const isInCart = cartItems.find(cartItem => cartItem.id === item.id);
        if (isInCart) {
            removeFromCart(item.id); // Remove item from cart if it is already there
        } else {
            addToCart(item); // Add item to cart if it's not already there
        }
    };

    return (
        <div className="mt-10">
            {/* Heading  */}
            <div>
                <h1 className="text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
            </div>

            {/* Main Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            const isInCart = cartItems.find(cartItem => cartItem.id === id); // Check if the item is in the cart
                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-80 h-96 w-full"
                                            src={productImageUrl}
                                            alt={title} // Change alt to use the product title for better accessibility
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                E-bharat
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleCartToggle(item)} // Use the handleCartToggle function
                                                    className={`w-full text-white py-[4px] rounded-lg font-bold ${isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'}`}
                                                >
                                                    {isInCart ? 'Remove from Cart' : 'Add to Cart'} {/* Button text based on cart status */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;
