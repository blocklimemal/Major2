const Product = require('../models/product');
const multer = require('multer')

const storage =multer.diskStorage({

  destination: function(req,file,callback){
    callback(null,'./public/images');
  },
  filename:function(req,file,callback){
    callback(null,file.fieldname + '-' +Date.now());
  }

});

var upload = multer({storage : storage}).single('imageUrl');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};



exports.postAddProduct = (req, res, next) => {
 

  upload(req,res,function(err){

     if(err){
      console.log('error uploading file');
     }else{
     // console.log('uploaded')
     // console.log(req.file);
     // console.log(req.files);

      
    const tempPath = "http://localhost:3000/images/"+req.file.filename;
  const title = req.body.title;
  const imageUrl = tempPath;
  const price = req.body.price;
  const description = req.body.description;

 Product.create({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description,
    userId:req.user.id
  }).then(val=>{
    res.redirect('/');
  }).catch(err=>{
    console.log(err);
  })

 }
})

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then(product=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err=>{
    console.log(err);
  })

};

exports.postEditProduct = (req, res, next) => {



upload(req,res,function(err){

     if(err){
      console.log('error uploading file');
     }else{
     // console.log('uploaded')
     // console.log(req.file);
     // console.log(req.files);

      
  const tempPath = "http://localhost:3000/images/"+req.file.filename;
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = tempPath;
  const updatedDesc = req.body.description;


Product.findById(prodId).then(product=>{
  product.title = updatedTitle ;
  product.price= updatedPrice ;
  product.imageUrl =updatedImageUrl;
  product.description = updatedDesc;
  product.userId = req.user.id;
  return product.save();
}).then(val=>{
  res.redirect('/admin/products');
}).catch(err=>{
  console.log(err);
})


  }
 
});
};


exports.getProducts = (req, res, next) => {
 Product.findAll().then(products=>{
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  })
 }).catch(err=>{
   console.log(err);
 })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product=>{
    product.destroy();
         res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  })
  res.redirect('/admin/products');
};
