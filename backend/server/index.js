const dotenv = require('dotenv');
const axios = require('axios');
const models = require('../models');
dotenv.config();

//axios using
async function getTodayData(p_item_category_code, p_regday) {
    try {
        let itemList = [];
        const p_cert_key = process.env.GROCERY_APIKEY;
        const p_cert_id = 2676;
        const url = `http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_regday=${p_regday}&p_convert_kg_yn=Y&p_item_category_code=${p_item_category_code}&p_cert_key=${p_cert_key}&p_cert_id=${p_cert_id}&p_returntype=json`;
        const response = await axios.get(url);
        const itemData = response.data.data.item;

        for (let i = 0; i < itemData.length; i++) {
            const itemName = itemData[i].item_name;
            const itemCode = itemData[i].item_code;
            const detailItemName = itemData[i].kind_name;
            const detailItemCode = itemData[i].kind_code;
            const rank = itemData[i].rank;
            //rankCode = itemData[i].rank_code;
            const price = itemData[i].dpr2;

            let unit = itemData[i].unit;
            if (unit.includes('g')) {
                unit = '1kg';
            }
            const item = {
                itemCode: itemCode,
                detailItemCode: detailItemCode,
                itemName: itemName,
                detailItemName: detailItemName,
                rank: rank,
                price: price,
                unit: unit,
            }
            itemList.push(item);
            await models.LiveIngredient.create(item);
        }
        //await liveIngredient.bulkCreate([itemList]);

    } catch (error) {
        console.error(error);
    }
}

module.exports = { getTodayData };