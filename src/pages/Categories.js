import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/pages/Categories.css';

const categories = [
    { name: "Fiction", description: "Explore imaginary worlds and characters.", image: "/categories/3d-fantasy-scene.jpg" },
    { name: "Non-Fiction", description: "Learn about the real world with factual books.", image: "/categories/black-white-portrait-sad-woman.jpg" },
    { name: "Mystery", description: "Dive into thrilling mysteries and uncover secrets.", image: "/categories/door-leading-magical-world.jpg" },
    { name: "Fantasy", description: "Get lost in magical realms and epic adventures.", image: "/categories/full-shot-ninja-riding-horse.jpg" },
    { name: "Science Fiction", description: "Explore futuristic and scientific concepts.", image: "/categories/futuristic-moon-background.jpg" },
    { name: "Biography", description: "Read about the lives of influential people.", image: "/categories/c59662b84c9a673a2910836a532cc4bc.jpg" },
    { name: "Historical Fiction", description: "Travel back in time with historical fiction.", image: "/categories/portrait-ancient-roman-gladiators.jpg" },
    { name: "Romance", description: "Experience love stories that touch the heart.", image: "/categories/side-view-romantic-couple-outdoors.jpg" },
    { name: "Horror", description: "Get spooked with chilling horror tales.", image: "/categories/horror-scene-with-eerie-playground.jpg" }
];

const Categories = () => {
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleCategoryClick = (category) => {
        navigate(`/catalog?genre=${category.toLowerCase()}`);
    };

    return (
        <div id="categories" className="categories-container">
            <div className="categories-photo">
                <img src="/background/top-view-books-arrangement.jpg" alt="categories-photo" />
            </div>
            <div className="categories-content">
                <h1 className="categories-title">Book Categories</h1>
                <Slider {...settings} className="categories-slider">
                    {categories.map((category, index) => (
                        <div key={index} className="category-card" onClick={() => handleCategoryClick(category.name)}>
                            <img src={category.image} alt={category.name} className="category-image" />
                            <h2 className="category-name">{category.name}</h2>
                            <p className="category-description">{category.description}</p>
                        </div>
                    ))}
                </Slider>
                <div className="categories-quote">
                    <p>"Books are a uniquely portable magic." - Stephen King</p>
                </div>
            </div>
        </div>
    );
}

export default Categories;
