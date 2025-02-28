import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Profile from "../models/Profile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create a New Profile (Secure)
export const createProfile = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const {
      name,
      age,
      location,
      instagramFollowers,
      engagementPercentage,
      height,
      weight,
      gender,
      averageROI,
    } = req.body;
    const image = req.file ? req.file.filename : null;

    if (
      !name ||
      !age ||
      !location ||
      !instagramFollowers ||
      !engagementPercentage ||
      !averageROI
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProfile = new Profile({
      user: req.user.id, // ✅ Securely associate profile with logged-in user
      name,
      age,
      gender,
      height,
      weight,
      location,
      instagramFollowers,
      engagementPercentage,
      averageROI,
      image,
    });

    await newProfile.save();
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving profile" });
  }
};

// ✅ Get Logged-In User's Profile (Secure)
export const getUserProfile = async (req, res) => {
  try {
    console.log("User ID from JWT:", req.user.id); // ✅ Debug
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name email"
    );

    if (!profile) {
      console.log("Profile not found for user ID:", req.user.id); // ✅ Debug
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// ✅ Update Profile (Secure)
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // ✅ Update fields only if provided
    profile.name = req.body.name || profile.name;
    profile.gender = req.body.gender || profile.gender;
    profile.birthday = req.body.birthday || profile.birthday;
    profile.height = req.body.height || profile.height;
    profile.weight = req.body.weight || profile.weight;
    profile.budget = req.body.budget || profile.budget;
    profile.instagramFollowers =
      req.body.instagramFollowers || profile.instagramFollowers;

    // ✅ Handle image update securely
    if (req.file) {
      if (profile.image) {
        const oldImagePath = path.join(__dirname, "../uploads", profile.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      profile.image = req.file.filename;
    }

    const updatedProfile = await profile.save();
    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating profile" });
  }
};

// ✅ Delete Profile (Secure)
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log("User ID from request:", req.body.userId); //for debug

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // ✅ Delete associated image file
    if (profile.image) {
      const imagePath = path.join(__dirname, "../uploads", profile.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Profile.deleteOne({ user: req.user.id }); // ✅ Ensure only logged-in user can delete their profile
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting profile" });
  }
};

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProfileCard = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     location: "",
//     instagramFollowers: "",
//     engagementPercentage: "",
//     averageROI: "",
//     image: null,
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("token"));
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!token) {
//         setError("No token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:4000/api/user/profiles/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//         setFormData(res.data); // Pre-fill form with existing data
//         setLoading(false);
//       } catch (error) {
//         setError("Profile not found or error fetching profile.");
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       setError("No token found. Please log in.");
//       return;
//     }

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const res = await axios.put("http://localhost:4000/api/user/profiles/profile", formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setProfile(res.data.profile);
//       setIsEditing(false);
//     } catch (error) {
//       setError("Error updating profile.");
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;
//   if (error) return <p className="has-text-danger">{error}</p>;
//   if (!profile) return <p>No profile found</p>;

//   return (
//     <section className="section is-medium">
//       <div className="container columns is-flex is-justify-content-center is-align-content-center">
//         <div className="card column is-one-third">
//           <div className="card-image">
//             <div className="has-text-centered"><h1 className="is-size-2">Profile</h1></div>
//             <figure className="image is-128x128">
//               <img
//                 src={profile.image?.startsWith("http") ? profile.image : `http://localhost:4000/uploads/${profile.image}`}
//                 alt={profile.name}
//               />
//             </figure>
//           </div>

//           <div className="card-content">
//             {!isEditing ? (
//               <>
//                 <p className="title">{profile.name}</p>
//                 <p>Age: {profile.age}</p>
//                 <p>Location: {profile.location}</p>
//                 <p>Instagram Followers: {profile.instagramFollowers?.toLocaleString() || "N/A"}</p>
//                 <p>Engagement: {profile.engagementPercentage ? `${profile.engagementPercentage}%` : "N/A"}</p>
//                 <p>Average ROI: ₹{profile.averageROI?.toLocaleString() || "N/A"}</p>
//                 <button className="button is-info mt-3" onClick={() => setIsEditing(true)}>Edit</button>
//               </>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} className="input" placeholder="Name" required />
//                 <input type="number" name="age" value={formData.age} onChange={handleChange} className="input" placeholder="Age" required />
//                 <input type="text" name="location" value={formData.location} onChange={handleChange} className="input" placeholder="Location" required />
//                 <input type="number" name="instagramFollowers" value={formData.instagramFollowers} onChange={handleChange} className="input" placeholder="Instagram Followers" />
//                 <input type="number" name="engagementPercentage" value={formData.engagementPercentage} onChange={handleChange} className="input" placeholder="Engagement Percentage" />
//                 <input type="number" name="averageROI" value={formData.averageROI} onChange={handleChange} className="input" placeholder="Average ROI" />
//                 <input type="file" name="image" onChange={handleImageChange} className="file-input" />
//                 <button type="submit" className="button is-success mt-3">Save</button>
//                 <button type="button" className="button is-light mt-3 ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfileCard;
