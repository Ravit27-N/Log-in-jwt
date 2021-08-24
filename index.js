const express = require('express')
const path = require('path')
const routes = require('./route/routes')
const home = require('./route/user')
const app = express()
const bodyParser = require('body-parser')

// var cookieParser = require('cookie-parser');
// app.use(cookieParser())

const exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


 
///adddddd
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));



app.use(routes);
app.use(home);




app.use((err, req, res, next) => {
    console.log(err);
    return res.send('Internal Server Error');
});

app.listen(5000, () => console.log('Server is runngin on port 5000'));