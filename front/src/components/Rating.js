import React from 'react';

export default function Rating(props){
    const {rating, numReviews} = props;
    return (
        <div className="rating">
            <i className={ rating >=1?"bx bxs-star": rating >=0.5?'bx bxs-star-half':'bx bx-star'}></i>
            <i className={ rating >=2?"bx bxs-star": rating >=1.5?'bx bxs-star-half':'bx bx-star'}></i>
            <i className={ rating >=3?"bx bxs-star": rating >=2.5?'bx bxs-star-half':'bx bx-star'}></i>
            <i className={ rating >=4?"bx bxs-star": rating >=3.5?'bx bxs-star-half':'bx bx-star'}></i>
            <i className={ rating >=5?"bx bxs-star": rating >=5.5?'bx bxs-star-half':'bx bx-star'}></i><br></br>
            <span>{numReviews + 'reviews'}</span>
        </div>
    )
}