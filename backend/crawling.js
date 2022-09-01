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

const getData = async function () {

    // for(var i=1; i < 8; i++) {
    let x = 10
    console.log(x)

        await page.waitForSelector('#searchForm > div > div.table-wrap.mb100 > div > table')

        const livestock_price = await page.evaluate(async function(){
            // await foo();
            var num = document.querySelector("#searchCondition2");
            returnData = []


            for(var i=1; i < 8; i++) {
                let y = 10
                console.log(y)
                document.querySelector(`#searchCondition1 > option:nth-child(${i})`).selected = true;
                setTimeout(10000);
                console.log('before waiting');

                setTimeout(function(){
                    console.log('waiting');
                }, 4000)

                console.log('after waiting');
                // document.querySelector("#ipt_search").click();

                for(var j=1; j < num.options.length; j++) {

                    var Price = document.querySelector('#searchForm > div > div.table-wrap.mb100 > div > table > tbody > tr:nth-child(4) > td:nth-child(6)').innerText
                    console.log(Price)

                    document.querySelector(`#searchCondition2 > option:nth-child(${j})`)
                    document.querySelector("#ipt_search").click();
                    
                    var jsonData = {
                        Price
                    }
                    // console.log(Price)
    
                    if(jsonData.Price != undefined) {
                        returnData.push(jsonData)  
                    }

                    function sleep(t){
                        return new Promise(resolve=>setTimeout(resolve,t));
                     }
                      
                      
                      
                     (async function(){
                       //메인 코드
                       console.log("시작!");
                       await sleep(5000);
                       console.log("1초 뒤에 찍힘");
                     })();
                    

                    // var jsonData = {
                    //     Price
                    // }
                    // // console.log(Price)
    
                    // if(jsonData.Price != undefined) {
                    //     returnData.push(jsonData)  
                    // }


                }
                // return returnData
                console.log(returnData)

            // document.querySelector(`#searchCondition1 > option:nth-child(${i})`).selected = true;

                // console.log(Price)
            }
            return returnData
            
        })
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