Here I have used Node.js Express, mongoose and MongoDB database to make all the
required APIs. Even included postman api file to apis for User's help Run the
command npm install first to download all dependencies. server with 'npm run
dev'. Than sign in with given email password. Copy the returned token to paste
in bearer token section in postman to get access of all other apis Here I used
the NoSQL database instead of SQL. I have all the knowledge of SQL database but
I am not proffesionally experienced in SQL as in all my previous companies I
used mongoDB But due to time constraint i knew could not do in time if I do it
in SQL SO please excuse my mistake.

**When send put request to edit services, add the priceOptions property with array of new price options if you want to add new options in the array.
and to remove any price send delete with http://localhost:8080/category/6548bb80b5758cf944aa8c9b/service/6548c69a1f429bb24c14d8d3/price/6548d525403655389c46d325
type request with last one being the id of price option.
