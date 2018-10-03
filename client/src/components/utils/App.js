import axios from "axios";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=d0d8316ccccd4426b403229ab6762b11&page=0&q=";

export default {
  search: function(query) {
    console.log("passed = ", query);
    console.log("query = ", BASEURL + query);

    axios.get(BASEURL + query)
    .then(function(response) {
      console.log("return ", response)
   
      console.log("get 5 ", response.data.response.docs.slice(0,5));

      return (response.data.response.docs.slice(0, 5));
  
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getNote: function() {
    return axios.get("/api/notes");
  },
  // Deletes the notes with the given id
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves a book to the database
  saveNote: function(result) {
    var author;

    if (!result.byline)
      author = "Not Specified";
    else
      author = result.byline.original;

    let savObj = {
      id: result._id,
      title: result.headline.main,
      author: author,
      url: result.web_url,
      date: result.pub_date
    }

    return axios.post("/api/notes", savObj);
  }
};
