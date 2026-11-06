const express=require("express")
const router=express.Router()
const Listing=require("../Models/Listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
const {listingSchema}=require("../schema.js")
const ExpressError=require("../utils/ExpressError.js")

const validateListing = (req,res,next)=>{
    let result = listingSchema.validate(req.body)
    if(result.error){
        let errMsg=result.error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    else next()    
}

//Index Route
router.get("/",wrapAsync(async (req,res)=>{
    const listings=await Listing.find()
    res.render("listings/index.ejs",{listings})
}))


//Create new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
})


//Show route
router.get("/:id",async(req,res)=>{
    let id=req.params.id;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing})
})

//create route
router.post("/", validateListing,wrapAsync(async(req,res,next)=>{
    // let {
    //     title,
    //     description,
    //     price,
    //     country,
    //     location,
    //     "image name": filename,
    //     "image url": url
    // } = req.body;
    //     await Listing.create({
    //     title:title,
    //     description:description,
    //     image:{
    //         filename:filename,
    //         url:url
    //     },
    //     price:price,
    //     country:country,
    //     location:location
    // }
    // )

    //let listing=req.body.list
    //const newlist=new Listing(req.body.list)
    //await newlist.save()
    console.log("BODY:", req.body);
    console.log("LIST:", req.body?.list);

     let {
        title,
        description,
        image,
        price,
        country,
        location
    } = req.body.list;
    
    await Listing.create({
        title,
        description,
        image,
        price,
        country,
        location
    });
    req.flash("success","New Listing Created!")
    res.redirect("/listings");
}))

//update route 
router.get("/:id/edit",async (req,res)=>{
    const listing=await Listing.findById(req.params.id)
    res.render("listings/edit.ejs",{listing})
})

router.put("/:id",wrapAsync(async(req,res)=>{
    let id=req.params.id
    const listing=await Listing.findById(id);
    if(!req.body || !req.body.list){
        throw new ExpressError(400,"Bad request");
    }
    const updatedList={...req.body.list}
    for( i in updatedList){
        if(updatedList[i]===""){
            updatedList[i]=listing[i];
        }
    }

    await Listing.findByIdAndUpdate(id,updatedList)
    //  const listing=Listing.findById(id)
    //  await Listing.findByIdAndUpdate(id, {
    //     title: req.body.listing.title,
    //     description: req.body.listing.description,
    //     price: req.body.listing.price,
    //     country: req.body.listing.country,
    //     location: req.body.listing.location,
    //     image: {
    //         filename: req.body.listing.image.filename,
    //         url: req.body.listing.image.url
    //     }
    // });
    res.redirect(`/listings/${id}`)
}))

//delete
router.delete("/:id",async(req,res)=>{
    // const id=req.params.id
    // const listing=await Listing.findById(id)
    // await Listing.deleteOne(listing)
    await Listing.findByIdAndDelete(req.params.id)
    res.redirect("/listings")
})

module.exports=router;
