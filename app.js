var     express         = require("express"),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        app             = express();
       
//Setting app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Setting Mongoose
mongoose.connect("mongodb://localhost/restfullblogapp", { useNewUrlParser: true });

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);


//Restfull rotes

app.get("/", function(req, res) {
    res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
    findAllBlogs(function(blogs){
        res.render("index", {blogs:blogs});
    });
})

//Database consulting

function findAllBlogs(callBack){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Operation failed: " + err);
        }
        callBack(blogs);
    })
}


//Initialization of server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening to port 3000");
    
})

