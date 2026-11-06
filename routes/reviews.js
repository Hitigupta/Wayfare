const express=require("express")
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose")
const Listing=require("../Models/Listing.js")
const Review=require("../Models/review.js")
const {reviewSchema}=require("../schema.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")


const validateReview = (req,res,next)=>{
    let result = reviewSchema.validate(req.body)
    if(result.error){
        let errMsg=result.error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    else next()    
}
// app.get("/testlistings",async (req,res)=>{
//     const Sample=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Calagute,Goa",
//         country:"India"
//     })
//     await Sample.save()
//     console.log("success")
//     res.send("Done")
// })


//review post route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newReview=new Review(req.body.review)

    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    res.redirect(`/listings/${req.params.id}`)
}))

//review dlt route 
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    let updatedListing = await Listing.findByIdAndUpdate(
    id,{ $pull: { reviews: new mongoose.Types.ObjectId(reviewId) } }
    );

    res.redirect(`/listings/${id}`)
}))

module.exports=router