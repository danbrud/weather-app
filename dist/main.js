const tempManager = new TempManager()
const renderer = new Renderer()

const loadPage = async () => {
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}


const handleSearch = async cityInput => {
    await tempManager.getCityData(cityInput)
    renderer.renderData(tempManager.cityData)
}


$("#search-button").click( () => handleSearch( $("#city-input").val() ))



loadPage()