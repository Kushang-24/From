import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || [];
    setRatings(storedRatings);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ratingData = { rating, description };
    const updatedRatings = [...ratings, ratingData];
    setRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
    setRating(0);
    setDescription("");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;
      return (
        <FaStar key={index} className="star" color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"} size={20}/>
      );
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 mt-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} className="mr-2">
                    <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} style={{ display: "none" }}/>
                    <FaStar className="star" color={ ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" } 
                      size={50} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(0)}/>
                  </label>
                );
              })}
            </div>
            <div className="form-group fw-bold my-3">
              <label>Description</label>
              <textarea className="form-control" rows={3} value={description}
                onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-primary fw-bold">Submit</button>
          </form>
        </div>
        <div className="col-8">
          <div className="mt-5">
            <div className="row">
              {ratings.map((rating, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <div className="me-3 mb-3">{renderStars(rating.rating)}</div>
                        <div>
                          <strong>Rating:</strong> {rating.rating}
                        </div>
                      </div>
                      <p className="card-text my-3">
                        <strong>Description:</strong> {rating.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
