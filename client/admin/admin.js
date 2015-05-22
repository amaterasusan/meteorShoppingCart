var isRemove = 0;
Template.cartPrice.helpers({
	
    'cartSetPrice': function() {
        var cartItems = CartItems.find({});
		var cartSetPrice = [];
    	cartItems.forEach( function(cartitem) {
	        var product = Products.findOne({_id:cartitem.product});
    	    cartitem.productname = product.name;
			if(cartitem.status == 0 || cartitem.status == 1) {
   			    cartSetPrice.push(cartitem);
			}
	    });
	    return cartSetPrice; 
    }
	
});	
Template.shoppingCart.helpers({
	
    'cartitems': function() {
        var cartItems = CartItems.find({});
        var shopCart = [];
    	cartItems.forEach( function(cartitem) {
	        var product = Products.findOne({_id:cartitem.product});
    	    cartitem.productname = product.name;
			if(cartitem.status == 2) {
				shopCart.push(cartitem);
			}
	    });
	    return shopCart; 
    }
	
});

Template.cartPrice.rendered =  function () {
	this.find('tbody')._uihooks = {
		removeElement: function(node) {
			var cartItem = CartItems.findOne({_id: $(node).attr('id')});
			var status = (cartItem) ? cartItem.status : 0,
				newTable,
				offsetFrom, 
				offsetTo, 
				nodeWidth,
				nodeClone;
			if(status != 2) {
				$(node).fadeOut(function() {
					this.remove();
				});
			} else {
				isRemove = 1;
				nodeClone = $(node).clone();
				nodeWidth = $('.cartPrice').width();
				offsetFrom = $(node).offset();
				offsetTo = $('.shopCart').offset();
				
				newTable = $('<table class="table table-striped table-bordered table-hover"></table>')
				.css({
					left: offsetFrom.left+'px',
					top: offsetFrom.top+'px',
					width: nodeWidth+'px',
					position: 'absolute'
				})
                .html('<tbody></tbody>')
                .children()
                .html(nodeClone)
                .end();

				newTable.appendTo('body')
				$(node).css('visibility', 'hidden');
				$(node).fadeOut({duration:100});
				newTable.animate({
					left: offsetTo.left+'px',
					top: offsetTo.top+'px',
					opacity: 0
				}, 800, function () {
					nodeClone.remove();
				});				
			}
    	}
	}
	
};

Template.shoppingCart.rendered = function () {
	this.find('tbody')._uihooks = {
		removeElement: function(node) {
			$(node).fadeOut(function() {
				this.remove();
			});
		},
		insertElement: function(node, next) {
			var tbody = $('.shopCart  tbody');
			if(isRemove == 1) {
				setTimeout(function() {
					$(node).addClass('css3-bounce').prependTo(tbody);
					isRemove = 0;
				}, 600);
			} else {
				$(node).addClass('css3-bounce').prependTo(tbody);
			}
		}
	}
};

Template.admin.events({
    'click .delete': function (evt, tmpl) {
		var targetEl = $(evt.target);
		var id = (this._id) ? this._id : targetEl.closest('tr').attr('id');
		
        Meteor.call('removeCartItem', id);
    },
    'click .setprice': function (evt, tmpl) {
		var obj = {status: 1};
		var prntPrice = $(evt.target).closest('tr'); 
		var price = Number(prntPrice.find('.priceCart input').val());
		if(price > 0) {
			obj.price = price;
			obj.setPrice = true;
			CartItems.update(this._id, { $set: obj });
			prntPrice.find('.priceCart').html(price);
		}
		
    }

});
