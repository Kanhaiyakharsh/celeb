// import BannerImg from "../../assets/Banner.jpg";
// import BannerImg2 from "../../assets/Bannerimage.jpg";
import BannerImg3 from "../../assets/Bannerimage3.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="hero is-success is-half-height has-background-black is-gap-3">
      <div className="container columns is-vcentered mt-6 mb-6 pt-6 pb-6">
        <div className="column  is-7 px-6">
          <p className=" title has-text-white is-size-3 is-size-4-mobile">
            Elevate Your Brand with Celebrity Collaborations{" "}
            <span className="has-text-warning">&</span> Marketing Solutions
          </p>
          <p className=" has-text-white is-size-6 is-size-7-mobile">
            <h2>
              Connect with Top Celebrities to Elevate Your Brand's Influence and
              Reach
            </h2>
          </p>
          <button
            onClick={() => navigate("/campaign")}
            className="button has-background-black has-text-black mt-6 mt-4-mobile  px-4 py-2 px-2-mobile py-1-mobile is-size-4 is-size-6-mobile has-background-warning  "
          >
            Create campaign
          </button>
        </div>
        <div className="column image is-flex is-justify-content-center is-align-items-center">
          <img
            className="custom-border-shadow bannerImage "
            src={BannerImg3}
            style={{ width: "380px", height: "500px", borderRadius: "10px" }}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
