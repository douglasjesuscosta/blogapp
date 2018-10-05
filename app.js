var     express         = require("express"),   
        methodOverride  = require("method-override"),
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


//RESTFULL ROTES

//Index Rote
app.get("/", function(req, res) {
    res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
    findAllBlogs(function(blogs){
        res.render("index", {blogs:blogs});
    });
})

//New rote
app.get("/blogs/new", function(req, res) {
    res.render("newblog")
})

app.post("/blogs", function(req, res){
    insertBlog(req.body.blog, function(newBlog){
        console.log("Inserted: " + newBlog);
        res.redirect("/blogs");
    })
})

//Show a specific blog

app.get("/blogs/:id", function(req, res) {
    findById(req.params.id, function(err, blog){
        if(!err){
            res.render("showblog.ejs", {blog:blog});
        }else{
            res.redirect("/blogs");
        }
    });
});

//Edit a blog
app.get("/blogs/:id/edit", function(req, res){
    findById(req.params.id, function(err, blog){
        if(!err){
            res.render("editblog", {blog:blog});
        }else{
            res.redirect("/blogs");
        }
    });
})

//update route
app.put('/blogs/:id', function(req, res){
    res.send("NOSSA UAU");
})


//DATABASE OPERATIONS

function findAllBlogs(callBack){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Operation failed: " + err);
        }
        callBack(blogs);
    })
}

//Databate create new blog

function insertBlog(newblog, callBack){
    console.log(newblog);
    
    Blog.create(newblog, function(err, newblog){
        if(err){
            console.log("Operation failed: " + err);
        }
        callBack(newblog);
    });
}



//Consult a post with a given id
function findById(id, callBack){
    Blog.findById(id, function(err, blog){
        if(err){
            console.log("Operation failed: " + err);
        }
        callBack(err, blog);
    })
}






//Initialization of server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening to port 3000");
    
})

