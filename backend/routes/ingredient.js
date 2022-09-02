const express = require('express');
const router = express.Router();

//for api
const dotenv = require('dotenv');
const models = require('../models');
const axios = require('axios');
const server = require('../server');
dotenv.config();

//원재료 전일 시세 정보 리스트 제공
router.get('/list',async function(req,res){
    //버튼 값에 따라 시세 정보 반환
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


//새로운 원재료(시세포함) 관련 정보 리스트 제공
router.get('/userlist',async function(req,res){
    try{
        const ingredientyList = await models.LiveIngredient.findAll({});
        res.send(ingredientyList);
    }catch(err){
        console.error(err);
    }
});

router.post('/userlist', async function(req,res){
    const itemCodeList = req.body; //array (itemcode)
    console.log(itemCodeList);
    const userId = res.locals.user.id;
    try{
        for(let i = 0 ;i<itemCodeList.length;i++){
            models.UserIngredient.create({
                userId : userId,
                itemCode : itemCodeList[i].itemCode,
                detailItemCode : itemCodeList[i].detailItemCode,
                price : itemCodeList[i].price,
            });
        }
        res.send('done');
    }catch(err){
        console.error(err);
    }
})


//추후 서버 정기 호출 함수로 변경 예정 (라우팅 말고)
router.get('/db', async function(req, res, next) {
    const data = [100,200,300,400,500,600];
    await models.LiveIngredient.destroy({where:{}});

    const d =new Date();
    const p_regday = d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());

    for(let i = 0 ;i < 6; i++){
        server.getTodayData(data[i],p_regday);
    }
    res.send('i');
});

//보유 원재료 관련 정보 리스트 제공
router.get('/existlist',async function(req,res){
    try{
        const ingredientyList = await models.Ingredient.findAll({});
        res.send(ingredientyList);
    }catch(err){
        console.error(err);
    }
});

router.post('/existlist', async function(req, res){
    const itemCodeList = req.body; //array (itemcode)
    const userId =res.locals.user.id;
    
    // 기존 저장 재료를 제거 후 새롭게 이번주 보유 재료를 저장
    try{
        await models.ExistIngredient.destroy({
            where: { userId : userId}
        })
        for(let i = 0 ;i<itemCodeList.length;i++){
            await models.ExistIngredient.create({
                userId : userId,
                itemCode : itemCodeList[i],
            });
        }
        res.send('done');
    }catch(err){
        console.error(err);
    }
})
module.exports = router;
