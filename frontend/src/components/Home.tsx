import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const recipes = useLoaderData() as Recipe[];

  const handleSearch = () => {
    if (searchValue === "") return;
    navigate(`/recipes?ingredients=${searchValue}`);
  };

  return (
    <>
      <div className="input">
        <h1>What's in your Fridge ?</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="e.g: apple,flour,sugar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <section className="swiper-slider">
        <h3>Popular</h3>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={10}
          slidesPerView={3}
          pagination={true}
          navigation={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
        >
          {recipes &&
            recipes.map((recipe, index) => (
              <SwiperSlide key={index} className="single-slide">
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Link to={`/recipes/${recipe.id}`}>
                  <div className="gradient"></div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
}
