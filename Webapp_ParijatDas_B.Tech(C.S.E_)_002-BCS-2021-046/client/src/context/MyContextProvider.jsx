/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import MyContext from './MyContext'
import CartContext, { CartProvider } from './cartContext';
import { useState, useEffect } from 'react'
import { fireDB } from '../firebase/FireBaseConfig';

function MyContextProvider({children}) {
    const [loading, setloading]=useState(false)
    const[getAllProduct, setGetAllProduct]=useState([]);
    const getAllProductFunction =async()=>{
      setloading(true);
      try {
        const q=query(
          collection(fireDB,"products"),
          orderBy('time')

        );
        const data=onSnapshot(q,(QuerySnapshot)=>{
          let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });

        });
        setGetAllProduct(productArray);
        setloading(false);

      });
      return ()=>data;
      } catch (error) 
      {
        console.log(error);
        
      }

    }
    useEffect(() => {
      getAllProductFunction();
  }, []);
    
  return (
    <MyContext.Provider value={{
        loading,
        setloading,
        getAllProduct,
        getAllProductFunction

    }}>
       <CartProvider>
        {children}
       </CartProvider>
    </MyContext.Provider>
  )

}
export default MyContextProvider