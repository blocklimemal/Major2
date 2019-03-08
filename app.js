const path = require('path');
const Order = require('./models/order');
const OrderItem =  require('./models/orderItem');
const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const errorController = require('./controllers/error');
const User = require('./models/user');
const Product = require('./models/product');
const cart = require('./models/cart');

const app = express();
const db  = require('./util/database');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req,res,next)=>{
        User.findById(1).then(val=>{
            req.user= val;
            next();
        }).catch(err=>{
            console.log(err);
        })
});
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
Product.belongsTo(User,{
    constaints:true,
    onDelete:'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});
db.sync().then(result=>{

    return User.findById(1);
}).then(user=>{
    if(!user)
    {
       
        return User.create({
            name:"Deven",
            email:"test@test.com"
        })
    }
    return user;
}).then(user=>{
    user.createCart();
    app.listen(3000);
}).catch(err=>{
console.log(err);
})
