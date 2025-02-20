import React from "react";
import celeb1 from "../../assets/celebrity1.jpg";
import celeb2 from "../../assets/celebrity2.jpg";
import celeb3 from "../../assets/celebrity3.jpg";
import celeb4 from "../../assets/celebrity4.jpg";

const CelebritySolution = () => {
  return (
    <section className="has-background-black has-text-white">
      <div className="container py-6 px-2">
        <div className="columns has-text-centered py-6">
          <div column="column ">
            <h2 className="title has-text-centered ">
              Redefine Your Business Promotion with Celebrity Solutions
            </h2>
            <p className="subtitle has-text-centered px-6 mx-6 has-text-warning">
              Amplify your brand's reach with Celebrity Solutions – connecting
              you with top celebrities for impactful, engaging promotions. Make
              your brand unforgettable
            </p>
          </div>
        </div>

        <div className="columns  my-3">
          <div className="column has-text-centered ">
            <img src={celeb1} alt="" />
            <h1 className="is-size-3 ">Image Brand Endorsement</h1>
            <p className="has-text-warning">
              Hire a Brand Ambassador to create a buzz in the market by
              promoting your brand/products/store etc.
            </p>
          </div>
          <div className="column has-text-centered">
            <img src={celeb2} alt="" />
            <h1 className="is-size-3 ">Commercial Video Shoutouts</h1>
            <p className="has-text-warning">
              Home/Studio Shooted professional brand promotion videos by celebs.
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column has-text-centered">
            <img src={celeb3} alt="" />
            <h1 className="is-size-3 ">Influencer Marketing</h1>
            <p className="has-text-warning">
              Hire Influencers to create a buzz in the market by promoting your
              brand/products/store etc.
            </p>
          </div>
          <div className="column has-text-centered">
            <img src={celeb4} alt="" />
            <h1 className="is-size-3 ">Celebrity Appearances</h1>

            <p className="has-text-warning">Invite a celebrity for your corporate or personal event.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebritySolution;
