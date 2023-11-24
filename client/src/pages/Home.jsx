import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Collections from "../components/Collections";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Collections/>
      <Categories />
      {/* <Products /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
