const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
    {
        searchTerm: String,
        Date: Date
    },
    
    {
        timestamps: true
    }
);

const SearchModel = mongoose.model("Search", searchSchema);

module.exports = SearchModel;