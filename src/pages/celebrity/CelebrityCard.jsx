// import React from "react";
// import BannerImg3 from "../../assets/celebrity1.jpg"; // Adjust the path as necessary


// const CelebrityCard = ({ celebrity }) => {
//   const handleInterest = async () => {
//   try {
//     await fetch("http://localhost:4000/admin/track-interest", {
//       method: "POST",
//     });
//     alert("Interest marked!");
//   } catch (error) {
//     console.error("Error marking interest:", error);
//   }
// };


//   return (
//     <section className="">
//       <div className="has-text-white is-flex  ">
//         <div className=" has-background-black">
//           <div className="is-flex is-gap-3 py-4 ">
//             <img
//               style={{ width: "200px", height: "200px" }}
//               src={BannerImg3}
//               alt={celebrity.name}
//             />{" "}
//             {/* Use celebrity name for alt text */}
//             <div className="">
//               <div className="">
//                 <p className="title is-4 has-text-white">{celebrity.name}</p>
                
//                 {/* Assuming username is not in JSON */}
//               </div>

//               <div className="">
//                 <p>Gender: {celebrity.gender}</p>
//                 <p>Birthday: {celebrity.birthday}</p>
//                 <p>Height: {celebrity.height} m</p>
//                 <p>Budget: ${celebrity.budget.toLocaleString()}</p>
//                 <p>
//                   Instagram Followers:{" "}
//                   {celebrity.instagram_followers.toLocaleString()}
//                 </p>

//                 <time datetime={celebrity.birthday}>
//                   Birthday: {celebrity.birthday}
//                 </time>
                
//               </div>
//               <button onClick={handleInterest} className="has-background-primary px-4 py-2 is-size-5 mt-2">Interested</button>
//             </div>
//           </div>
//         </div>
//       </div>

      
//     </section>
//   );
// };

// export default CelebrityCard;



import React from "react";
import BannerImg3 from "../../assets/celebrity1.jpg"; 

const CelebrityCard = ({ celebrity, userId }) => {
  const handleInterest = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin/track-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId, // Make sure to pass userId
          campaignId: celebrity.id, // Make sure celebrity object has an 'id'
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Interest marked successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error marking interest:", error);
    }
  };

  return (
    <section>
      <div className="has-text-white is-flex">
        <div className="has-background-black">
          <div className="is-flex is-gap-3 py-4">
            <img
              style={{ width: "200px", height: "200px" }}
              src={BannerImg3}
              alt={celebrity.name}
            />
            <div>
              <p className="title is-4 has-text-white">{celebrity.name}</p>
              <p>Gender: {celebrity.gender}</p>
              <p>Birthday: {celebrity.birthday}</p>
              <p>Height: {celebrity.height} m</p>
              <p>Budget: ${celebrity.budget.toLocaleString()}</p>
              <p>Instagram Followers: {celebrity.instagram_followers.toLocaleString()}</p>
              <button onClick={handleInterest} className="has-background-primary px-4 py-2 is-size-5 mt-2">
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrityCard;
