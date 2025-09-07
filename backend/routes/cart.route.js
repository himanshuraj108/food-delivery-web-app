import express from 'express';
import { addToCart,removeCart,getCart } from '../controllers/cart.controller.js';


const cartRouter = express.Router();

cartRouter.post('/add',addToCart);
cartRouter.post('/remove',removeCart);
cartRouter.get('/get',getCart);

export default cartRouter;