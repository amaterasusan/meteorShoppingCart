Router.configure({
	layoutTemplate:'layout',
	yieldTemplates:{
		'products':{to:'products'},
		'cart':{to:'cart'},
		'admin':{to:'admin'}
	}
});
Router.map(function() {
	this.route('/','layout');
	this.route('products', {
		layoutTemplate:'layout',
		path:'/:name',
		data: function() {
			console.log(this.params.name);
		},
		template:'layout'
	});
});

Template.registerHelper('currency', function (num) {
	return '$' + Number(num).toFixed(2);
});

Template.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;
    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](lvalue, rvalue);
	return result;  
	/*
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
	*/
});
Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
