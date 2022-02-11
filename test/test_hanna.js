const assert = require('assert')
const { By, Key, until } = require('selenium-webdriver');
const seleniumTesting = require('selenium-webdriver/testing');
const suite = seleniumTesting.suite; //see: node_modules/selenium-webdriver/testing/index.js

seleniumTesting.init(); //This loads up the available browsers on the system and prepares the "suite" function

let browserCount = 0;
suite(function(env) {
    browserCount++

    /**
     * @type {WebDriver} - See: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
     */
    let driver = null; 

    describe(`Testing that we can search on the Hanna Andersson site browserCount=${browserCount}`, async function(){
        this.timeout(15000);

        let driver;

        before(async function() {
          driver = await env.builder().build();
        })
   
        after(function() {
            //comment line below to prevent browser from quitting after executing tests
            driver.quit()
        })

        it('Can load a url', async function() {
            await driver.get('https://www.hannaandersson.com/')
        })

        it('Title is right', async function(){
            const pageTitle = "Hanna Andersson | Premium Kids Clothes and Matching PJs"
            await driver.wait(until.titleIs(pageTitle), 3000)
            const currentTitle = await driver.getTitle()
            console.log(`currentTitle=${currentTitle}`)
        })

        // it('Shows the right Valentine\'s day image in the banner section',async function(){
        //     const bannerImages = await driver.findElements(By.css('div#main div.home-main a div.contained-content picture img'))
        //     const bannerSrc = 'https://cdn-vzn.yottaa.net/5d02a70c4f1bbf63c39ca930/www.hannaandersson.com/v~4b.c9/dw/image/v2/BBLM_PRD/on/demandware.static/-/Sites-hannaandersson-Library/default/dw1292211b/images/homepage/SP22_promobanner_40off-vday.jpg?sw=1920&sfrm=png&yocs=R_U_'
        //     cconsole.log(bannerImages.tit` founf`)
        // })

        let popUpXOutButton = null;
        it('Can dismiss the popup upon launch', async function(){
            await driver.sleep(3000)
            popUpXOutButton = await driver.findElement(By.css('button.ui-dialog-titlebar-close'))
            await popUpXOutButton.click()
            console.log('Found and clicked the X to quit the pop up upon first launch') 
        })

        let searchIcon = null;
        it('Has a search element that can be clicked/expanded', async function() {
            await driver.sleep(4000)
            searchIcon = await driver.findElement(By.css('div.js-search-trigger div.sh-middle-right-icon'))   
            console.log('Search ICON found at: ',searchIcon) 
            await searchIcon.click()
            console.log('Search ICON was clicked/expanded') 
        })
        
        it('Can search for some text', async function() { 
            const searchField = await driver.findElement(By.css('fieldset.header-search-wrapper input#q'))
            await searchField.sendKeys('dress', Key.RETURN)
        })

        it(`Shows min 12 search results`, async function() {
            const searchResultsIndividual = await driver.findElements (By.css(`div.category-results__product`))
            assert.equal(searchResultsIndividual.length > 11, true);
        })

    })
})
