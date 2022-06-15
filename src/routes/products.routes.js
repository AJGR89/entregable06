const express = require("express");
const { Router } = express;
const myContenedor = require("../database");
const path = require("path");
const {app, server,io} = require('../app');
const { faker } = require('@faker-js/faker');
faker.locale = "es";
const { commerce, image, random } = faker;
let id = 0;

const router = Router();

//GEL TEST
router.get('/productos-test',(req,res)=>{
  let products = [];
    for(let i=0; i<5;i++){
        products.push( {
            _id:id,
            title: commerce.product(),
            price: random.numeric(6, { bannedDigits: ['0'] }),
            thumbnail: image.imageUrl(),
        })
        id++;
    }
    // res.status(200).json({response:response})
    res.status(200).render("test-products",{products:products});
});


module.exports = router;
