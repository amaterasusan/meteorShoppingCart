Template.cart.cartitems = function() {
};
Template.cart.helpers({
    'cartitems':function() {
        var shopCart = [];
        var cartItems = CartItems.find({});
        var total = 0;

    	cartItems.forEach(function(cartitem) {
        	var item = _.extend(cartitem,{});
	        var product = Products.findOne({_id:cartitem.product});
			if(cartitem.status == 2) {
	    	    cartitem.productname = product.name;
    	    	cartitem.price = cartitem.price;
				total += (Number(cartitem.price) * cartitem.qty)
    		    shopCart.push(cartitem);
			}
	    });
		shopCart.total = total;
	    return shopCart; 
    }
})

Template.cart.events({
    'click .delete':function(evt, tmpl){
        Meteor.call('removeCartItem', this._id);
    }
});
