const express = require("express");
const router = express.Router();
const request = require("request");
const Search = require("../models");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/imageSearchApi/latest", (req, res, next) => {
    let termArr = [];
    Search.find({}).sort({"_id":-1}).limit(10).exec( (err, data) => {
        if(err){
            console.log(err);
        }else{
            data.forEach(function(item, i, ar){
                let term = item.searchTerm;
                let when = item.createdAt;
                let termObj = {
                    term,
                    when
                };
                termArr.push(termObj);
            });
            res.status(200).json(termArr);
        }
    });
});

router.get("/imageSearchApi/:searchTerm*", (req, res, next) => {
    if(req.query && req.query < 1){
        req.query = "";
    }
    
    let { searchTerm } = req.params;
    let { offset } = req.query;
    
    let data = new Search({
        searchTerm,
        Date: new Date()
    });
    
    data.save(err => {
        if(err){
            console.log("Error saving to database.");
            res.send(err);
        }else{
            console.log("Data saved to db.");
        }
    });
    
    let options = {
        url: "https://api.imgur.com/3/gallery/search/?q=" + searchTerm,
        headers: {
            "Authorization": process.env.CLIENT_ID
        }
    };
    
    let magicHappensHere = (err, response, body) => {
        let searchArr =[];
        
        if(err){
            console.log(err);
        }else{
            let info = JSON.parse(body);
            let result = info.data;
            let col = parseInt(offset, 10) * 10;
            let temp = result.splice(0, col);
            let fac = result.length < 10 ? result.length : 10;
            console.log("temp val: ", temp);
            console.log("number of items in result: ", result.length);
            
            if(result.length < 1){
                result.length = 0;
                res.render("index");
                return;
            }else{
                for(var i = 0; i < fac; i++){
                    let title = result[i].title;
                    let link = result[i].link;
                    let desc = result[i].description;
                    let obj = {title, link, desc};
                    searchArr.push(obj);
                }
            }
            res.json(searchArr);
        }
    };
    
    request(options, magicHappensHere);
});


module.exports = router;