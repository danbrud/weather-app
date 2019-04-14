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


$("#search-button").click( () => { 
    handleSearch( $("#city-input").val())
    $("#city-input").val("")
})

$(document).keypress( function (e) {
    var key = e.which
    if (key === 13) {
        handleSearch( $("#city-input").val())
        $("#city-input").val("") 
    }
})

$("#cities-container").on("click", ".add-button", function() {
    let name = $(this).siblings(".city-name").text()
    tempManager.saveCity(name)
    renderer.renderData(tempManager.cityData)
})

$("#cities-container").on("click", ".remove-button", function() {
    let name = $(this).siblings(".city-name").text()
    tempManager.removeCity(name)
    renderer.renderData(tempManager.cityData)
})

$("#cities-container").on("click", ".refresh-button", async function() {
    let name = $(this).closest(".last-update").siblings(".city-name").text()
    console.log(name)
    await tempManager.updateCity(name)
    renderer.renderData(tempManager.cityData)
})


loadPage()