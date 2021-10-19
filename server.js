/**  Import Section */

require('dotenv/config');
const express = require("express") ;
const cors = require('cors');


/**  Initialize section */

const app = express();
const port = process.env.PORT || 8080;
require('./database/db');



/**  middleware Section */

app.use(express.json());
app.use(cors());



/**  API Routing Section */

require('./router/user-router')(app) ;
require('./router/job-router')(app) ;



/**  Server Listening Section */

app.listen(port, ()=>{
    console.log(` Application is running on ${port} `);
})