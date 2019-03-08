const Product = require('../models/product');
const Cart = require('../models/cart');
const Order =require('../models/order');
const orderItem =require('../models/orderItem');
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((val) => {
      res.render('shop/product-list', {
        prods: val,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where:{id:prodId}})
    .then((product) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((val) => {
      console.log(val);
      res.render('shop/index', {
        prods: val,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
 req.user.getCart().then(cart=>{
  
   return cart.getProducts();
 }).then(val=>{
 res.render('shop/cart', {
  path: '/cart',
  pageTitle: 'Your Cart',
  products: val
});
    
 }).catch(err=>{
   console.log(err);
 })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity =1;
  let fetchedCart ;
  req.user.getCart().then(cart=>{
     fetchedCart =cart;     
    return cart.getProducts({where:{id:prodId}});
  }).then(products=>{
  
    let product;
     if(products.length>0)
     {
       product = products[0];

     }
     if(product)
     {
       newQuantity = product.cartItem.quantity+1;
       return  Product.findById(prodId) ;
     }
     
     return  Product.findById(prodId);
     }).then(product=>{
    return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});

     }).then(val=>{

      res.redirect('/cart');
     }).then(val=>{
    res.redirect('/cart');
  }).catch(err=>{
    console.log(err);
  })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
       req.user.getCart().then(Cart=>{
         return Cart.getProducts({where:{id:prodId}})
       }).then(product=>{
        return product[0].cartItem.destroy();

       }).then(val=>{

        res.redirect('/cart');
         console.log(val);
       }).catch(err=>{
         console.log(err);
       })
};


exports.postOrder = (req,res,next)=>{

 let fetchedCart;
  req.user
  .getCart().then(Cart=>{
    fetchedCart=Cart;
     return Cart.getProducts();
  }).then(products=>{


  
  
    req.user.createOrder().then(order=>{
  return  order.addProducts(products.map(product=>{
     product.orderItem  = {quantity:product.cartItem.quantity};
     console.log(product);
       return product;
    })).catch(err=>{
  console.log(err);
    })
      
    });
  }).then(val=>{
    fetchedCart.setProducts(null);
    res.redirect('/orders');
  }).catch(err=>{
    console.log(err);
  })

};

exports.getOrders = (req, res, next) => {
   req.user
   .getOrders({include:['products']}).then(orders=>{
  //  console.log(orders[0].products[0].orderItem);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders
    });
      
   })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
