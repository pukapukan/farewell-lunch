var ObjectID = require('mongodb').ObjectID;

/*
 * GET home page.
 */
var options = {
		menu:{
			buffet:[
				'Steak',
				'Salmon Slab',
				'Mixed Grill',
				'Chicken Thigh'
			],
			alacarte:[
				'Caesar Salad',
				'Cobb Salad',
				'Double Beef Booster',
				'Piggy Wiggly Burger',
				'Sloppy Joe',
				'Prawn Meltdown',
				'3 Amigos',
				'Creamy Hearty Chicky',
				'Ham & Ms',
				'The Prawn Who Got Creamed',
				'Mushroom Attack',
				'Carbonara Classic',
				'The Meatball That Ate Manhattan',
				'Mushroom Madness Pizza',
				'Meat Me Up Pizza',
				'3 Amigos Pizza',
				'Hawaiian Pizza',
				'Good Ol\'Fish & Chips',
				'Southwest Cajun Chicken',
				'Grill N.Y. Steak'
			]
		},
		drink:{
			coffee:[
				'Cappuccino',
				'Coffee',
				'Espresso',
				'Latte',
				'Mocha'
			],
			tea:[
				'Celebration',
				'Caramel',
				'Darjelling Green Tea',
				'Earl Grey',
				'Mint',
				'Passion',
				'Iced Lemon Tea'
			],
			thirst_quencher:[
				'Coke',
				'Sprite',
				'Coke Light',
				'Root Beer',
				'Apple Juice',
				'Cranberry Juice',
				'Pineapple Juice',
				'Bottled Water',
				'Hoegaarden',
				'Tiger Beer',
				'Lemon Shiver',
				'Ravin Rasberries',
				'Sundown Sorbet',
				'French Vanilla Ear Cooler',
				'Root Beer Float'
			]			
		}
	};

module.exports = function(app, db){
	var collection = db.collection("farewell_lunch_choice");

	app.get('/', function(req, res){
	  res.render('index', 
	  	{ 
	  		title: 'Jason\'s Farewell Lunch',
	  		options: options
	  	});
	});

	app.get('/options/', function(req, res){
		res.send(options);
	});

	app.get('/choices/', function(req,res){
		collection.find().toArray(function(err, docs){
			res.send(docs);
		});
	});

	app.post('/register', function(req,res){
		var choice = {
			name: req.body.inputName,
			type: req.body.radioMenu === "buffet" ? "Buffet" : "Ala Carte",
			menu: req.body.inputMenu,
			drink: req.body.inputDrink,
			remarks: req.body.inputRemarks
		};
		collection.insert(choice, function(err, result) {
			res.send({result: result});
		});
	});

	app.post('/delete', function(req,res){
		collection.remove({ _id: new ObjectID(req.body.key) }, function(err, count){
			res.send({result: count});
		});
	});
}