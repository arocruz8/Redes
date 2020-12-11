const express=require('express');
const router=express.Router();

router.get('/', (req, res)=>{
    //res.send('FOME LA WEA PINCHE CULEAO');
   res.render('index.hbs');
});

module.exports= router;
