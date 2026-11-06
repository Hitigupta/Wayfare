const moongose=require("mongoose");
const Schema=moongose.Schema;
const Review=require("./review.js")

const listingschema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:{type:String,
            default:"https://assets.cntraveller.in/photos/693917a638ff62cee2a7dde5/1:1/w_5464,h_5464,c_limit/Nautilus-14.jpg",
            set:(v)=>
                v===""?"https://assets.cntraveller.in/photos/693917a638ff62cee2a7dde5/1:1/w_5464,h_5464,c_limit/Nautilus-14.jpg":v},
        filename:{
            type:String,
            default:"hello"
        }        
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]
});

listingschema.post("findOneAndDelete",async(listing)=>{
   if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

const Listing = moongose.model("listing",listingschema)
module.exports=Listing 