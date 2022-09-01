import { launch, goto, getData, writeFile } from './crawling.js'

async function main () {
    await launch()

    await goto('https://www.ekapepia.com/priceComparison/poducerPrice/retail/prdlstPrice.do')

    await getData()

    await writeFile()

    // process.exit(1)
}

main()