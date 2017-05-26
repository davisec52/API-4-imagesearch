FCC Image Search API Challenge

Objective: Build a full stack JavaScript app that allows you to search for images, and then deploy it to Heroku.

Note that for each project, you should create a new GitHub repository and a new Heroku project.
Here are the specific user stories you should implement for this project:

User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
                
User Story: I can paginate through the responses by adding a ?offset=2 query to the URL.
                    
User Story: I can get a list of the most recently submitted search strings.

Note on First User Story: Our app can only work with the data returned by the imgur.com API. The imgur API does not return the
specific data asked for in the original FCC objectives. We have chosen instead to return the image urls, titles, and descriptions.

A Note on Second User Story: The imgur API does not appear to have an offset function or at least not one that is
easily available.We rigged a kind of funky offset with a base unit value of 10. Thus, an offset of 1 will remove the first 10 items from search, an offset of 2 removes the first 20 items from search and so on. If the offset value is greater than the total number of items in the search, effectively remmoving all items from search,the app returns you to the index page.

Note on Third User Story: A query for the latest searches was to return the page urls of images, but this information is not provided in the imgur search API, or at least not evident to the app creator. Instead, our app returns the search term and time of creation.

Sample Search Strings:

<code>https://fcc-imagesearch-api.herokuapp.com/imageSearchApi/wild+puppies</code>  // Returns first 10 search items for searh term.
                   
<code>https://fcc-imagesearch-api.herokuapp.com/imageSearchApi/wild+puppies?offset=2</code>  // Returns first 10 items after removal of first 20, in this example.

<code>https://fcc-imagesearch-api.herokuapp.com/imageSearchApi/latest</code>  // Returns last 10 most recent searches.
                
