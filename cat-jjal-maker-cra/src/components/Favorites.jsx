import CatItem from "./CatItem";

const Favorites = ({ favorites }) => {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }
  return (
    <ul className="favorites">
      {favorites.map((item) => (
        <CatItem img={item} key={item} />
      ))}
    </ul>
  );
};

export default Favorites;
