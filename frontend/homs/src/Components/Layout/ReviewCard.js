import React , { useState , useEffect } from 'react'
import Rating from '@mui/material/Rating';

function ReviewCard({ review }) {

    const [individualValue, setIndividualValue] = useState(0);

      useEffect(() => {
        // Assuming `review` is a prop or state that holds the review data.
        const reviewStars = review.review.rating;
        setIndividualValue(reviewStars);
        
      }, [review]);


  return (
    <>
      <div key={review._id} class="card product-review-card">
                <div class="card-header product-review-card-header">
                    <h2>{review.review.writer}</h2>
                    <Rating
                    name="read-only"
                    value={individualValue}
                    className='product-review-card-header-rating'
                    readOnly
                />
                </div>
                <div class="card-body product-review-card-body">
                    <blockquote class="blockquote mb-0">
                      <p>{review.review.message}</p>
                    </blockquote>
                </div>
      </div>
    </>
  )
}

export default ReviewCard
