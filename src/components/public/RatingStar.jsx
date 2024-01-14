// Imports
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// Component
const RatingStar = ({
        quantity = 5,       // quantity stars
        size = 30,          // size stars    
        rating = 0,         // rating value
        editMode = false,   // form mode 
        ratingValue,
        setRatingValue
    }) => {
    // states
    const [hover, setHover] = useState(null);

    useEffect(()=>{
        if (rating) {
            setRatingValue(rating);
        }
    },[rating]);

    // set star color with this function
    const setColor = (currentRating) => {
        if (editMode) {
            if (currentRating <= (hover || ratingValue)) {
                return "#ffc107";
            }else{
                return "#e4e5e9";
            }
        }else{
            if (currentRating <= ratingValue) {
                return "#ffc107";
            }else{
                return "#e4e5e9";
            }
        }
    }
    // Component
    return (
        <>
            <div className="flex justify-center">
                {
                    [...Array(quantity)].map((star, index) =>{
                        const currentRating = index + 1;
                        return (
                            <label>
                                {editMode && (
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={currentRating} 
                                        onClick={() => {
                                            let value = ratingValue === currentRating ? 0: currentRating;
                                            setRatingValue(value);
                                            // rating = value;
                                        }} 
                                        className="hidden"
                                    />
                                )}
                                <FaStar
                                    size={size}
                                    color={setColor(currentRating)}
                                    onMouseEnter={()=> editMode && setHover(currentRating)}
                                    onMouseLeave={()=> editMode && setHover(null)}
                                    className={`${editMode ? "cursor-pointer":""}`}
                                ></FaStar>
                            </label>
                        )
                    })
                } 
            </div>
        </>
    )
}

export default RatingStar;