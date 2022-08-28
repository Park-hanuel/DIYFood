const express = require('express');
const router = express.Router();

//for api
const dotenv = require('dotenv');
const models = require('../models');
const axios = require('axios');
const server = require('../server');
dotenv.config();

router.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
  })

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

//오늘 중 구현 예정
router.post('/userlist', async function(req,res){
    // const itemCodeList = req.body.itemList; //array (itemcode)
    // const userId = res.locals.user.id;
    // console.log(itemCodeList);
    // try{
    //     for(let item of itemCodeList){
    //         console.log(item)
    //         models.ExistIngredient.create({
    //             userId : userId,
    //             itemCode : item,
    //         });
    //     }
    //     res.send('done');
    // }catch(err){
    //     console.error(err);
    // }
})


//추후 서버 정기 호출 함수로 변경 예정 (라우팅 말고)
router.get('/db', function(req, res, next) {
    const data = [100,200,300,400,500,600];
    for(let i = 0 ;i < 6; i++){
        server.getTodayData(data[i]);
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
    //user 세션값 받아오기 후 변경해야함
    // const user = 4;
    const itemCodeList = req.body; //array (itemcode)

    console.log(res.locals.user);
    const userId = res.locals.user.id;
    console.log(itemCodeList);
    try{
        for(let i = 0 ;i<itemCodeList.length;i++){
            models.ExistIngredient.create({
                userId : user,
                itemCode : itemCodeList[i],
            });
        }
        res.send('done');
    }catch(err){
        console.error(err);
    }
})
module.exports = router;
