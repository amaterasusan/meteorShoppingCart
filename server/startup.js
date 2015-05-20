Meteor.startup(function() {
    if(Products.find().count() === 0) {
		Products.insert({
			'thumb':'prod1.jpg',
			'SKU':'sb301',
			'name':'Dell OptiPlex GX270',
			'price':80
		});
		Products.insert({
			'thumb':'prod2.jpg',
			'SKU':'sb302',
			'name':'Dell OptiPlex GX280 SFF',
			'price':90
		});
		Products.insert({
			'thumb':'prod3.jpg',
			'SKU':'sb303',
			'name':'Dell WorkStation T3400',
			'price':100
		});
    }
});
Meteor.methods({
    //delete when live
    removeAll: function (){
        CartItems.remove({});
    },
    addToCart: function (qty, product, session, status, price) {
		var obj = {
				qty: qty,
				product: product,
				sessid: session,
				status: status,
				price: price
			};
			
		if (qty > 0) {
            CartItems.insert(obj);
        } else {
            console.log('Quantity is Zero');
        }

    },
    removeCartItem: function (id) {
        CartItems.remove({_id: id});
    },
	removeAllProducts: function () {
		return Products.remove({});
	}

});