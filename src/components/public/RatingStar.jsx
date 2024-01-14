// Imports
import { useState } from "react";
import { FaStar } from "react-icons/fa";
// Component
const RatingStar = ({
        quantity = 5,       // quantity stars
        size = 30,          // size stars    
        rating = 0,         // rating value
        editMode = false,   // form mode 
        setData,             // set Data
        isRatingForm,
        ratingObj
    }) => {
    // states
    const [ratingValue, setRating] = useState(rating);
    const [hover, setHover] = useState(null);
    // set star color with this function
    const setColor = (currentRating) => {
        // if (isRatingForm) {
        //     setData({...ratingObj, points: currentRating});
        // }else{
        //     setData(currentRating);
        // }
        if (editMode) {
            if (currentRating <= (hover || rating)) {
                return "#ffc107";
            }else{
                return "#e4e5e9";
            }
        }else{
            if (currentRating <= rating) {
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
                                        onClick={() => rating === currentRating ? rating = 0: setRating(currentRating)} 
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