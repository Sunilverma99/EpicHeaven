import Listing from "../models/listing.js"
import { errorHandler } from "../utiles/error.js";
export const addListing= async (req,res,next)=>{
    try {
        const listing=new Listing(req.body);
         await listing.save();
        console.log(listing);
   res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
} 
export const deleteListing=async (req,res,next)=>{
    const listing= await Listing.findById(req.params.id);
    if(!listing){
            return next(errorHandler(401,"Listing not found"))
    }
    if(req.user.id!=listing.userRef){
        return next(errorHandler(403,"You can only delete your listing"))
    }
    try {
         await Listing.findByIdAndDelete(req.params.id);
         res.status(200).json('User has been deleted successfully');
    } catch (error) {
        next(error);
    }
}
export const updateUserListing=async(req,res,next)=>{
    const listing= await Listing.findById(req.params.id);
    if(!listing){
            return next(errorHandler(401,"Listing not found"))
    }
    if(req.user.id!=listing.userRef){
        return next(errorHandler(403,"You can only edit your listing"))
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    address: req.body.address,
                    regularPrice: req.body.regularPrice,
                    discountPrice: req.body.discountPrice,
                    bathrooms: req.body.bathrooms,
                    bedrooms: req.body.bedrooms,
                    furnished: req.body.furnished,
                    parking: req.body.parking,
                    sale: req.body.sale,
                    rent: req.body.rent,
                    imageUrls: req.body.imageUrls,
                    offer: req.body.offer,
                    userRef: req.body.userRef,
                }
            },
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}