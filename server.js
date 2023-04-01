const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); //templating
const routes = require('./controllers'); // routes
const helpers = require('./utils/helpers'); //middleware

const sequelize = require('./config/connection'); // sequelize db setup
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// create a session with default cookie values
const sess = {
  secret: 'Super secret secret',
  cookie: {}, // default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //to make css and js files accessible

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});