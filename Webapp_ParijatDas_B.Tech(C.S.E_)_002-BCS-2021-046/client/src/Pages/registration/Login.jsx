/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { auth, fireDB } from "../../firebase/FireBaseConfig";
import toast from "react-hot-toast";
import { collection, onSnapshot, query, where } from "firebase/firestore";


const Login = () => {
    const context =useContext(myContext);
    const {loading, setloading}=context;
    const navigate= useNavigate();
    const[userLogin, setuserLogin]=useState({
        email: "",
        password: ""
    });
    const userLoginFunction= async()=>{
        if(userLogin.email===""||userLogin.password==="" ){
            alert("Please fill all the fields");

        }
        setloading(true);
        try {
            const users=await signInWithEmailAndPassword(auth,userLogin.email,userLogin.password);
            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setuserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setloading(false);
                    if(user.role === "user") {
                        navigate('/user');
                    }else{
                        navigate('/admin');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
            
        catch (error) {
            
            console.log(error);
            setloading(false);
            toast.error("Login Failed");

        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => {
                            setuserLogin({
                                ...userLogin,
                                email: e.target.value
                            })}}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => {
                            setuserLogin({
                                ...userLogin,
                                password: e.target.value
                            })}}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;