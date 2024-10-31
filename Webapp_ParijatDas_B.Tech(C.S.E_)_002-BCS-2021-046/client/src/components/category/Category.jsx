// category import 
import { Navigate, useNavigate } from 'react-router-dom';
import image1 from '../../assets/img_1.jpg';
import image2 from '../../assets/img_2.jpg';
import image3 from '../../assets/img_3.jpg';
import image4 from '../../assets/img_4.jpg';
import image5 from '../../assets/img_5.jpg';
import image6 from '../../assets/img_6.jpg';
import image7 from '../../assets/img_7.jpg';

const category = [
    {
        image: image1,
        name: 'Abstract'
    },
    {
        image: image2,
        name: 'Landscape'
    },
    {
        image: image3,
        name: 'Still-Life'
    },
    {
        image: image4,
        name: 'Historical'
    },
    {
        image: image5,
        name: 'Surrealism'
    },
    {
        image: image6,
        name: 'Minimalism'
    },
    {
        image: 'Pop -Art',
        name: 'home'
    },
    
];

const Category = () => {
    const navigate=useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
                    <div className="flex">
                        {category.map((item, index) => (
                            <div key={index} className="px-3 lg:px-10">
                                {/* Image */}
                                <div  onClick={()=>navigate(`/category/${item.name}`)}
                                className="w-36 h-36 lg:w-24 lg:h-24 rounded-full bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 flex justify-center items-center overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover rounded-full"
                                        src={item.image}
                                        alt={item.name}
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback if image fails to load
                                    />
                                </div>
                                <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">
                                    {item.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hide scrollbar style */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; } .hide-scroll-bar::-webkit-scrollbar { display: none; }" }} />
        </div>
    );
}

export default Category;
