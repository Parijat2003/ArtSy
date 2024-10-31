import React, { useContext,useState } from 'react';
import { Trash } from 'lucide-react';
import Layout from "../../components/Layout/Layout";
import CartContext from "../../context/cartContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FireBaseConfig";
import BuyNowModal from  '../../components/BuyNowModal/BuyNowModal.jsx'

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseInt(item.price.replace(/₹|,/g, '')) * item.quantity;
            return total + itemPrice;
        }, 0);
    };
    const user = JSON.parse(localStorage.getItem('users'))

    // Buy Now Function
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const buyNowFunction = () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }

        // Order Info 
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfull")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-semibold tracking-tighter text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">Items in your cart</h2>
                            <ul role="list" className="divide-y divide-gray">
                                {cartItems.length === 0 ? (
                                    <p className="text-center py-8">Your cart is empty.</p>
                                ) : (
                                    cartItems.map((product) => (
                                        <div key={product.id}>
                                            <li className="flex py-6 sm:py-6">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={product.productImageUrl}
                                                        alt={product.name}
                                                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-black">
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <p className="text-sm text-gray-500">{product.color}</p>
                                                            {product.size && (
                                                                <p className="ml-4 border-l border-gray-200 px-2 text-sm text-gray-500">
                                                                    {product.size}
                                                                </p>
                                                            )}
                                                            <div className="mt-1 flex items-end">
                                                                <p className="text-xs font-medium text-gray-500 line-through">
                                                                    {product.originalPrice}
                                                                </p>
                                                                <p className="text-sm font-medium text-gray-900 ml-2">
                                                                    ₹{product.price}
                                                                </p>
                                                                <p className="text-sm font-medium text-green-500 ml-2">
                                                                    {product.discount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <div className="mb-2 flex">
                                                <div className="min-w-24 flex">
                                                    <button type="button" onClick={() => updateQuantity(product.id, product.quantity - 1)} disabled={product.quantity === 1} className="h-7 w-7">-</button>
                                                    <input
                                                        type="text"
                                                        className="mx-1 h-7 w-9 rounded-md border text-center"
                                                        value={product.quantity}
                                                        readOnly
                                                    />
                                                    <button type="button" onClick={() => updateQuantity(product.id, product.quantity + 1)} className="h-7 w-7">+</button>
                                                </div>
                                                <div className="ml-6 flex text-sm">
                                                    <button type="button" onClick={() => removeFromCart(product.id)} className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                        <Trash size={12} className="text-red-500" />
                                                        <span className="text-xs font-medium text-red-500">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </ul>
                        </section>
                        <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
                            <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">Details</h2>
                            <div>
                                <dl className="space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItems.length} items)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{calculateTotal()}</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-gray-800">Discount</dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹3,431</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">Delivery Charges</dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{calculateTotal()}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                <div className="flex gap-4 mb-6">
                                        {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            /> : <Navigate to={'/login'}/>
                                        }
                                </div>
                            </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
