const express = require('express');
const router = express.Router();
const server = require('../server');

//for api
const dotenv = require('dotenv');
const axios = require('axios');
const Grocery = require('../models/grocery');
dotenv.config();

router.get('/list',async function(req,res){
    const p_item_category_code= req.query.category_code;


    //get Today Date
    const d =new Date();
    const p_regday = d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());

    let itemList = [];
    const p_cert_key = process.env.GROCERY_APIKEY;
    const p_cert_id = 2676; 
    const url = `http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_regday=${p_regday}&p_convert_kg_yn=Y&p_item_category_code=${p_item_category_code}&p_cert_key=${p_cert_key}&p_cert_id=${p_cert_id}&p_returntype=json`;

    try{
        const response = await axios.get(url);
        const itemData = response.data.data.item;
        res.send(itemData);
    }catch(err){
        console.error(err);
    }
});

router.get('/',async function(req,res){
    try{
        const groceryList = await Grocery.findAll({});
        res.send(groceryList);
    }catch(err){
        console.error(err);
    }
});

//추후 서버 정기 호출 함수로 변경 예정 (라우팅 말고)
router.get('/db', function(req, res, next) {
    const data = [100,200,300,400,500,600];
    for(let i = 0 ;i < 6; i++){
        server.getTodayData(data[i]);
    }
    res.send('i');
});


module.exports = router;
