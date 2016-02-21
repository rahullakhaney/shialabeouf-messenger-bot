var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('facebook-chat-api');
var request = require('request');
var http = require('http');
http.createServer(function (req, res) {
  console.log("ping");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("");
}).listen(process.env.PORT || 5000);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var keys = [
              "Validate your fucking ideas.",
  "Keep your investors in the fucking loop.",
  "Fucking measure your KPI's.",
  "Email your fucking mentors.",
  "Make something fucking useful.",
  "Take fucking breaks.",
  "Don't fucking give up.",
  "Keep fucking trying.",
  "Talk to fucking people.",
  "Ask for fucking advice.",
  "Take all advice like a fucking grain of salt.",
  "Don't let mentors change your fucking ideas.",
  "Fucking test everything.",
  "Don't act like a fucking startup.",
  "Go fucking workout.",
  "Take care of your fucking self.",
  "Eat fucking right.",
  "Stay fucking self-funded as long as possible.",
  "Chase the fucking vision, not the money.",
  "Ask. Don't fucking tell.",
  "Make every fucking detail perfect.",
  "Limit the fucking number of details to perfect.",
  "Don't fucking worry about failure.",
  "Know what your fucking product is.",
  "Know who your fucking customers are.",
  "Know how you're going to make fucking money.",
  "Take fucking risks.",
  "Fix your fucking mistakes.",
  "Have fucking lawyers.",
  "Carefully choose your fucking investors.",
  "Know how to fucking scale.",
  "Let your designers be fucking creative.",
  "Have fucking developers.",
  "Don't worry about your fucking salary.",
  "Refine your fucking skills.",
  "Just fucking launch.",
  "Work with people who push you to the fucking extreme.",
  "Spend time and money on fucking marketing.",
  "Fucking brand yourself.",
  "Connect with fucking influencers.",
  "Think outside the fucking box.",
  "Nothing is fucking impossible.",
  "Fire your un-talented fucking partners.",
  "Don't fuck up.",
  "Sweat equity is the fucking best startup capital.",
  "Don't fuck with your fucking product. Unless it's a rubber doll.",
  "Don't fuck your fucking team.",
  "Don't ever play yourself.",
  "Choose your startup partners fucking wisely.",
  "Be fucking original.",
  "Keep personal life and work life fucking seperate.",
  "Don't trust all the fucking advice.",
  "Get out there and shake some fucking hands.",
  "Don't ever fucking give up! Unless it's fucking time to give up.",
  "Be fucking honest.",
  "Being an entrepreneur is like suicide: requires balls and everything to lose. Fucking do it, anyway.",
  "Stop worrying about fucking investors. Worry about customers.",
  "Keep your communications fucking professional.",
  "Sales cure every fucking thing.",
  "Don't spend the whole day here! Go build your fucking product!",
  "DON'T BE A FUCKING IDIOT.",
  "Have a fucking purpose!",
  "Don't fucking run out of money!",
  "Don't fuck with your investors.",
  "Don't look for cofounders at fucking startup events.",
  "Stop making fucking excuses. Just fucking do it!",
  "Fucking do it now. Don't procrastinate.",
  "WORK FUCKING HARDER!",
  "Know Who You're Fucking With!",
  "Solve the fucking problem.",
  "Don't bend over while fucking negotiating.",
  "Hire some fucking designers!",
  "Don't be fucking cheap. Quality over quantity.",
  "Reject bad fucking ideas and protocols.",
  "Don't fucking recruit employees with bad attitude.",
  "Pay your fucking debts.",
  "Ask yourself this from day one: Do I want to do business or I just want to fuck around?!",
  "Find out what people fucking need, not what people think they might fucking want.",
  "Never fucking underestimate your competitors.",
  "Be fucking patient.",
  "FUCK THE LOGIC.",
  "Make fucking money.",
  "Don't fucking be afraid of failure.",
  "Talk to your fucking customers.",
  "An entrepreneur is willing to challenge fucking tradition, in order to discover new and better ways to accomplish their goals and dreams.",
  "Be a fucking LEADER!",
  "Decisions: Make the fucking hard right over the easy wrong EVERY fucking time!",
  "Never stop fucking learning.",
  "Be a master of your own fucking destiny.",
  "Ignore most of the fucking advice you're given."
];

var greetings = ["hey", "hello", "sup", "what's up", "greetings", "shia", "shia labeouf", "sensei", "hi", "whatsup", "whatsup?", "namaste"];
var thanks = ["thanks", "thank you", "thanks so much", "great", "appreciate it", "thanks shia", "thanks bot", "you're the fucking greatest", "thank you so much", "appreciate it", "awesome"];
var help = ["help", "wtf is this", "who are you", "what is this", "i'm calling the cops", "gtfo"];

login({email: "", password: ""}, function callback (err, api) { //replace with your facebook email address and password
    if(err) return console.error(err);

    var keysToSuccess = [];
    for(var i=0; i<keys.length; i++)
    {
       if(keys[i].indexOf("key") > -1) {
          keysToSuccess.push(keys[i]);
       }
    }

    api.listen(function callback(err, message) {
        if(err) return console.log(err);

        console.log('got message - '+message.body);

        var response = "";
        if(inArray(message.body.toLowerCase(),["key", "keys", "🔑"])) {
          response = keysToSuccess[Math.floor(Math.random()*keysToSuccess.length)];
        }
        else if (inArray(message.body.toLowerCase(), greetings)) {
          response = "Namaste 🙏 This is Shia labeouff Bot and I'm here to give you some great fucking startup advice.";
        }
        else if (inArray(message.body.toLowerCase(), help)) {
          response = "I'm a digital embodiment of Shia Labeouf and I'm here to give you the major fucking 🔑s to success";
        }
        else if (inArray(message.body.toLowerCase(), thanks)) {
          response = "You're welcome! Namaste 🙏";
        }
        else {
          response = keys[Math.floor(Math.random()*keysToSuccess.length)];
        }

        var yourID = message.participantIDs[0]; 
        var msg = {body: response};
        api.sendMessage(msg, yourID);
    }
)});

function inArray(message, keywords) {
    var length = keywords.length;
    for(var i = 0; i < length; i++) {
        if(message.search(keywords[i]) > -1)
            return true;
    }
    return false;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
