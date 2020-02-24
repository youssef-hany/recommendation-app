var express = require('express');
var cors = require('cors');
var app = express(); //initializing express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ 
	extended: false
})
);
const mongoURI = 'mongodb://localhost/recom';

mongoose.connect( mongoURI, {useUnifiedTopology: true,
useNewUrlParser: true}). then(() => console.log('Mongo CONNECTED')).catch(err => console.log(err));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
  


app.get('/events', function (request, response) {
    Events.find({}, function (err, events) {
        if (err) {
            response.status(500).send({
                error: "Could not show Events"
            });
        } else {
			
            response.send(events);


        }


      });
    });

app.get('/trial', function(request, response){
    response.send({title: "also working"})
});

app.use('/uploads', express.static('./uploads'))
app.use('/uploads/posts', express.static('./uploads/posts'))
app.post('/add/event', function (request, response) {
    var event = new Events();
    event.EventName = request.body.EventName;
    event.EventType = request.body.EventType;
		event.EventNumber = request.body.EventNumber;
		event.Coorp = request.body.Coorp;
		event.Location = request.body.Location;
		event.VidUrl = request.body.VidUrl;
		event.ImgUrl = request.body.ImgUrl;
    event.save(function (err, savedEvent) {
        if (err) {
            response.status(500).send({
                error: "Could not save product : maybe db is down"
            });
        } else {
            response.send(savedEvent);
        }

    });
});
 
var Users = require('./routes/users');
var Posts = require('./routes/posts');
app.use('/users', Users);
app.use('/posts', Posts);
app.listen(port, function(){
  console.log('Server running on Port 3001');
  
});

