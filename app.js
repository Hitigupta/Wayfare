const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const MONGO_URL="mongodb://127.0.0.1:27017/Wayfare"
const ExpressError=require("./utils/ExpressError.js")
const reviewrouter=require("./routes/reviews.js")
const listingrouter=require("./routes/listing.js")
const session=require("express-session")
const flash=require("connect-flash")

const sessionOptions={
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+3*24*60*60*1000,
        maxAge:3*24*60*60*1000,
        httponly:true
    }
}

main()
.then(()=>{
    console.log("Connection is established")
})
.catch((err)=>{
    console.log(err)
})


async function main(){
    await mongoose.connect(MONGO_URL)
}

app.listen(8080,()=>{
    console.log("App started at port 8080")
})


app.use(express.json())
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")))
app.engine("ejs",ejsMate)
app.use(session(sessionOptions))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    console.log(res.locals.success)
    next()
})

app.use("/listing/:id/reviews",reviewrouter)
app.use("/listings",listingrouter);

app.get("/",(req,res)=>{
    res.send("Hi!Welcome to the root")
})

app.all("/{*splat}",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    console.log(message)
    res.status(statusCode).render("err.ejs",{message})
})
