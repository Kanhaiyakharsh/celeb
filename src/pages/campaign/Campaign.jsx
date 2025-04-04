
import React, { useState } from "react";

const Campaign = () => {
  
  const [description, setDescription] = useState(""); 
  const [budget, setBudget] = useState("");
  const [audience, setAudience] = useState("");
  const [message, setMessage] = useState(null); 

  const getMessages = async () => {
    // localStorage.setItem("campaignDescription", description);

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: description,budget,audience
        
      }),
      headers: {
        "Content-Type": "application/json", 
      },
    };

    try {
      const response = await fetch("http://localhost:4000/campaign", options);
      const data = await response.json();
      console.log(data); 
      await fetch("http://localhost:4000/admin/track-campaign", {
        method: "POST",
      });
      setMessage(data.choices[0].message);


    } catch (error) {
      console.log(error);
    }
  };

  console.log(message)

  return (
    <div>
      <div className="section has-background-black">
        <div>
          <h1 className="has-text-white is-size-3 has-text-centered has-text-weight-semibold">
            Create Campaign
          </h1>
        </div>

        <div className="container px-6 py-6">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Enter your Name" />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Enter your Email"
                
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <label className="label">Target Audience</label>
          <div className="control">
            <input
            value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="input"
              type="text"
              placeholder="Enter your Target Audience"
            />
          </div>

          <label className="label">Budget</label>
          <div className="control">
            <input
            value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input"
              type="number" 
              placeholder="Enter your Budget"
            />
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea"
                placeholder="Textarea"
              ></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
             
              <button type="button" onClick={getMessages} className="button is-link">
                Submit
              </button>
            </div>
            <div className="control">
              <button type="button" className="button is-link is-light">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
