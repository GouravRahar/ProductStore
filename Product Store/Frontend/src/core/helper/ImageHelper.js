import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;

//Line 4-7 Here first we are recieving a product and then checking if product exists load the product
//...photo from url{we used this url in backend to get a photo, so we are using that here} and if
//...not such product exists or something like that happens,  then load the pexels photo AND
//...we using this func in card which is also reciveing the product from somewhere, so we are
//...using that product here basically
