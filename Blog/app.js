var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
mongoose.connect("mongodb://localhost/rest_full_blogs", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//blog schema definition
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type : Date, default : Date.now}
});

//blog model
var Blog = mongoose.model("Blog", blogSchema);

//Restfull Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});
//index route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           res.redirect("/blogs")
       }
       else{
           res.render("index", {blogs: blogs});
       }
   });
});

//new route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//create route
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newblog){
       if(err){
           res.send("something went wrong" + err);
       }else{
           res.redirect("/blogs");
       }
    });
});

//show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.send("something went wrong" + err + "  " + req.params.id+" 1");
       }else{
           res.render("show", {blog : foundBlog});
       }
    });
});

//Edit Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.send("something went wrong" + err + "2");
       } 
       else{
        res.render("edit", {blog : foundBlog});    
       }
    });
});

//update route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.send("something went wrong" + err + "3");
        }else{
            res.redirect("/blogs/"+ req.params.id);
        }
    });
});

//delete route
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndDelete(req.params.id, function(err){
      if(err){
          res.send("something went wrong" + err + "4");
      }
      else{
          res.redirect("/blogs");
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App has been started!!!");
});