/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, collection,addDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setloading } = context;
    const navigate = useNavigate();
    
    const [userSignup, setuserSignup] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "" || userSignup.cpassword === "") {
            toast.error("All fields are required");
            return;
        }

        setloading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
            const user = {
                name: userSignup.name,
                email: userSignup.email,
                role: userSignup.role,
                uid: users.user.uid,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            };

            // Save user to database
            const userReference = collection(fireDB, "user");
            await addDoc(userReference, user);  

            setuserSignup({
                name: "",
                email: "",
                password: "",
                cpassword: "",
                role: "user"
            });

            toast.success("Signup Successfully");
            setloading(false);
            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error("Signup Failed");
            setloading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => setuserSignup({ ...userSignup, name: e.target.value })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => setuserSignup({ ...userSignup, email: e.target.value })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => setuserSignup({ ...userSignup, password: e.target.value })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={userSignup.cpassword}
                        onChange={(e) => setuserSignup({ ...userSignup, cpassword: e.target.value })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
};

export default Signup;
