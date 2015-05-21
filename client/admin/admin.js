Template.admin.helpers({
	
    'cartSetPrice': function() {
        var cartItems = CartItems.find({});
		var cartSetPrice = [];
    	cartItems.forEach( function(cartitem) {
        	var item = _.extend(cartitem,{});
	        var product = Products.findOne({_id:cartitem.product});
    	    cartitem.productname = product.name;
			if(cartitem.status == 0 || cartitem.status == 1) {
   			    cartSetPrice.push(cartitem);
			}
	    });
	    return cartSetPrice; 
    },
    'cartitems': function() {
        var cartItems = CartItems.find({});
        var shopCart = [];
    	cartItems.forEach( function(cartitem) {
        	var item = _.extend(cartitem,{});
	        var product = Products.findOne({_id:cartitem.product});
    	    cartitem.productname = product.name;
			if(cartitem.status == 2) {
				shopCart.push(cartitem);
			}
	    });
	    return shopCart; 
    }
	
});	

Template.admin.rendered = function () {
	this.find('.cartPrice tbody')._uihooks = {
		insertElement: function(node, next) {
			$(node)
	        .addClass('itemHidden')
       		.insertBefore(next)
	        .fadeIn()
			.promise()
            .done(function () {
                $(this).removeClass('itemHidden');
            });
		},
		removeElement: function(node) {
			$(node).fadeOut(function() {
				this.remove();
			});
    	}
	}
	this.find('.shopCart tbody')._uihooks = {
		insertElement: function(node, next) {
			$(node)
	        .addClass('itemHidden')
       		.insertBefore(next)
	        .fadeIn()
			.promise()
            .done(function () {
                $(this).removeClass('itemHidden');
            });
		},
		removeElement: function(node) {
			$(node).fadeOut(function() {
				this.remove();
			});
    	}
	}

};	

Template.admin.events({
    'click .delete': function (evt, tmpl) {
        Meteor.call('removeCartItem', this._id);
    },
    'click .setprice': function (evt, tmpl) {
		var obj = {status: 1};
		var price = Number($(evt.target).closest('tr').find('input').val());
		if(price > 0) {
			obj.price = price;
			obj.setPrice = true;
		}
		CartItems.update(this._id, { $set: obj });
    }

});
