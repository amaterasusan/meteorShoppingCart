Template.products.helpers({
	'productlist': function() {
		var productList = [];
		var products = Products.find({});
    	products.forEach(function(product) {
			var cartItem = CartItems.findOne({product: product._id});
			product.status = (cartItem) ? cartItem.status: -1;
			product.price = (cartItem)? cartItem.price: product.price;
			productList.push(product);
	    });
	    return productList; 
    }
});

Template.product.helpers({
	'isUser': function() {
    	return (Meteor.user() && Meteor.user().username != "admin") ? 1 : 0;
    }
});	

Template.addToCart.onRendered(function() {
	var cartItem = CartItems.findOne({product: this.data._id});
	var id = cartItem._id;
	if (cartItem && cartItem.setPrice) {
		$('#'+this.data._id).find('.addcart').addClass('css3-bounce');
		cartItem.setPrice = false;
		delete cartItem._id;
		CartItems.update(id, { $set: cartItem });
		/*
		setTimeout(function(){      
			$('.addcart').removeClass('css3-bounce');
		}, 800);
		*/
	}
});
Template.product.events({
    'click .toadmin': function (evt, tmpl) {
        var qty = tmpl.find('.prodqty').value;
        var product = this._id;
        var price = tmpl.find('.price-default').value;
        var sessid = Meteor.default_connection._lastSessionId;
        Meteor.call('addToCart', qty, product, sessid, 0, price);
    },
	
    'click .addcart': function (evt, tmpl) {
        var qty = tmpl.find('.prodqty').value;
		var price = tmpl.find('.price-default').value;
        var product = this._id;
        var sessid = Meteor.default_connection._lastSessionId;
        Meteor.call('addToCart', qty, product, sessid, 2, price);
    },
	
	'click .cancel-cart': function (evt, tmpl){
		var cartItem = CartItems.findOne({product: this._id});
		if(cartItem) {
			var cartId = cartItem._id;  
    	    Meteor.call('removeCartItem', cartId);
		}
    }
});
