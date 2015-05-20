Template.admin.helpers({
    'cartitems': function() {
        var shopCart = [];
        var cartItems = CartItems.find({});

    	cartItems.forEach( function(cartitem) {
        	var item = _.extend(cartitem,{});
	        var product = Products.findOne({_id:cartitem.product});
			//if(cartitem.status == 0) {
	    	    cartitem.productname = product.name;
   		    	//cartitem.price = product.price;
   			    shopCart.push(cartitem);
			//}
	    });
	    return shopCart; 
    }
})

Template.admin.events({
    'click .delete': function (evt,tmpl) {
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
