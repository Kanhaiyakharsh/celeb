

const Recommendation = () => {
  const handleInterestedClick = async () => {
    // const campaignDescription = localStorage.getItem("campaignDescription") || "Default message";
    try {
      // Adjust the URL if needed (e.g., http://localhost:4000/send-message)
      const response = await fetch("http://localhost:4000/api/user/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Add any required data, e.g., phone number
        body: JSON.stringify({ to: "+11234567890" }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Message sent:", data.message);
      } else {
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <section className="has-background-black has-text-white">
      <div className="container ">
        <h1 className="is-size-4 px-4">Recommendation</h1>
        <div className="card mx-2 my-6">
          <header className="card-header">
            <p className="card-header-title is-centered py-6">Name</p>
          </header>
          <div className="card-content">
            <div className="content">
              <h3 className="title is-5">Demographics</h3>
              <div className="columns is-multiline">
                <div className="column is-6">
                  <p>
                    <strong>Age:</strong>
                  </p>
                </div>
                <div className="column is-6">
                  <p>
                    <strong>Location:</strong>{" "}
                  </p>
                </div>
              </div>

              <h3 className="title is-5 mt-4">Social Metrics</h3>
              <div className="columns is-multiline">
                <div className="column is-6">
                  <p>
                    <strong>Followers:</strong>{" "}
                  </p>
                </div>
                <div className="column is-6">
                  <p>
                    <strong>Engagement:</strong> %
                  </p>
                </div>
              </div>

              <h3 className="title is-5 mt-4">Historical Performance</h3>
              <div className="columns is-multiline">
                <div className="column is-6">
                  <p>
                    <strong>Previous Endorsements:</strong>{" "}
                  </p>
                </div>
                <div className="column is-6">
                  <p>
                    <strong>Average ROI:</strong> %
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button
              onClick={handleInterestedClick}
              className={`card-footer-item button is-primary `}
            >
              Interested
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
