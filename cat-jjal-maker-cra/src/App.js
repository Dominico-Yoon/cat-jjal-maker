import { useEffect, useState } from "react";
import "./App.css";
import Favorites from "./components/Favorites";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Title from "./components/Title";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/cat/${responseJson._id}/says/${text}`;
};

console.log("야옹");

const App = () => {
  const [title, setTitle] = useState(() => {
    return jsonLocalStorage.getItem("title");
  });
  const [catImg, setCatImg] = useState();
  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  useEffect(() => {
    console.log("리렌더링");
    setInitialCat();
  }, []);

  const alreadyFavorite = favorites.includes(catImg);

  const setInitialCat = async () => {
    const newCat = await fetchCat("First Cat");
    setCatImg(newCat);
  };

  const updateMainCat = async (text) => {
    const newCat = await fetchCat(text);
    setCatImg(newCat);

    // setTitle(nextCounter);
    // 수정된 코드 ()
    setTitle((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("title", nextCounter);
      return nextCounter;
    });
  };

  const handleHeartClick = () => {
    const nextFavorites = [...favorites, catImg];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  };

  return (
    <div>
      {title === null ? (
        <Title>고양이 가라사대</Title>
      ) : (
        <Title>{title}번째 고양이 가라사대</Title>
      )}
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={catImg}
        handleHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
