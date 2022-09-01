import puppeteer from "puppeteer-core";
import os from 'os'
import fs from 'fs'

const macUrl = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const whidowsUrl = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
const currentOs = os.type()
const launchConfig = {
  headless: false,
  defaultViewport: null,
  ignoreDefaultArgs: ['--disable-extensions'],
  args: [ '--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications', '--disable-extensions'],
  executablePath: currentOs == 'Darwin' ? macUrl : whidowsUrl
}

let browser = null
let page = null
let finalData = []



const launch = async function() {

    browser = await puppeteer.launch(launchConfig);
    const pages = await browser.pages();
    page = pages[0]
}

const goto = async function(url) {
    return await page.goto(url)
}

const getData = async function (i) {

    // for(var i=1; i < 8; i++) {

        await page.waitForSelector('#searchForm > div > div.table-wrap.mb100 > div > table')

        const livestock_price = await page.evaluate(function(i){
            
            var num = document.querySelector("#searchCondition2");
            returnData = []

            for(var i=1; i < 8; i++) {
                document.querySelector(`#searchCondition1 > option:nth-child(${i})`).selected = true;
                // document.querySelector("#ipt_search").click();
                

                for(var j=1; j < num.options.length; j++) {
                    document.querySelector(`#searchCondition2 > option:nth-child(${j})`)
                    document.querySelector("#ipt_search").click();

                    var Price = document.querySelector('#searchForm > div > div.table-wrap.mb100 > div > table > tbody > tr:nth-child(4) > td:nth-child(6)').innerText

                    var jsonData = {
                        Price
                    }
                    console.log(Price)
    
                    if(jsonData.Price != undefined) {
                        returnData.push(jsonData)  
                    }


                }
                // return returnData
                console.log(returnData)

            // document.querySelector(`#searchCondition1 > option:nth-child(${i})`).selected = true;

                // console.log(Price)
            }
            return returnData
            
        },i)
        finalData = finalData.concat(livestock_price)

        // await page.evaluate(function(i){
        //     document.querySelector(`#searchCondition1 > option:nth-child(${i})`).selected = true;
        //     document.querySelector("#ipt_search").click();
        // },i)


        // await page.waitForSelector('#searchForm')
        // document.querySelector(`#searchCondition1 > option:nth-child(${i})`).selected = true;
        // document.querySelector("#ipt_search").click();

        // await page.waitForSelector('#searchForm')
    // }
    // finalData = finalData.concat(livestock_price)
}

const writeFile = async function () {
    const stringData = JSON.stringify(finalData)

    const exist = fs.existsSync(`./json/PriceData`)

    if(!exist) {

        fs.mkdir(`./json/PriceData`, {rescursive: true}, function (err) {
            console.log(err)
        } )
    }
    const filePath = './json/PriceData/livestock.json'

    await fs.writeFileSync(filePath, stringData)

}

export {
    launch,
    goto,
    getData,
    writeFile
}