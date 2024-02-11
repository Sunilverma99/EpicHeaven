import bcrypt from 'bcryptjs';
import User from '../models/schema.js';
import { errorHandler } from '../utiles/error.js';
import Listing from '../models/listing.js';
export const user=(req,res)=>{
    res.send('Hello sunil verma');
}

export const userUpdate = async (req, res, next) => {
   
    if (req.user.id !== req.params.id) {    
        return next(401, "You can access only your account");
    }

    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePhoto: req.body.profilePhoto,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
        return next(401,"You can delete only your own account")
    }
    try {
         await User.findByIdAndDelete(req.params.id);
         res.clearCookie('access_token');
         res.status(200).json('User has been deleted successfully');
        
    } catch (error) {
        next(error);
    }
}

export const getAllListings=async (req,res,next)=>{
    if(req.user.id==req.params.id){
       
        try {
            const listings=  await Listing.find({userRef:req.params.id});
            res.json(listings);
        } catch (error) {
            next(error.message);
        }
    }else{
        return next(errorHandler("402","You can see only your listings"))
    }
}
export const getListing=async (req,res,next)=>{
        try {
            const listing=  await Listing.findById({_id:req.params.id});
            console.log(listing)
            res.json(listing);
        } catch (error) {
            next(error.message);
        }
}
export const getuserInfo=async(req,res,next)=>{
    try {
        const listing=  await User.findById({_id:req.params.id});
            console.log(listing)
            res.json(listing);
    } catch (error) {
        next(error.message)
    }
}

export const getListings = async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 9;
            const startIndex = parseInt(req.query.startIndex) || 0;
            let offer = req.query.offer;
            
            if (offer === undefined || offer === 'false') {
                offer = { $in: [false, true] };
            }
            let furnished = req.query.furnished;
            
            if (furnished === undefined || furnished === 'false') {
                furnished = { $in: [false, true] };
            }
            
            let parking = req.query.parking;
            
            if (parking === undefined || parking === 'false') {
                parking = { $in: [false, true] };
            }
            let type = req.query.type;
            console.log(type)
            if (type === undefined || type === 'all') { 
                type = { $in: ['sale', 'rent'] };
            }
            // console.log("sunil",offer,"fg--",furnished,"we",parking,"type",type)
      
          const searchTerm = req.query.searchTerm || '';
      
          const sort = req.query.sort || 'createdAt';
      
          const order = req.query.order || 'desc';
           
          const listings = await Listing.find({
             name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking
          })
             .sort({ [sort]: order })
             .limit(limit)
             .skip(startIndex); 
           console.log(listings)
          return res.status(200).json(listings);
        } catch (error) {
          next(error);
        }
      };

