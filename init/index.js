//To reinitialise database with new data
const moongose=require("mongoose")
const initdata=require("./data.js")
const Listing=require("../Models/Listing.js")
const MONGO_URL="mongodb://127.0.0.1:27017/Wayfare"
main()
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await moongose.connect(MONGO_URL)
}

const initDB=async ()=>{
    await Listing.deleteMany({})
    await Listing.insertMany(initdata.data)
    console.log("Data was initialized")
}

initDB();
