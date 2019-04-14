
const tempManager = new TempManager()
const renderer = new Renderer()

const msToTime = duration => Math.floor((duration / (1000 * 60 * 60)) % 24)

const loadPage = async () => {
    let currentTime = new Date()

    await tempManager.getDataFromDB()

    for (let city of tempManager.cityData) {

        let cityTime = moment(city.updatedAt, "ddd, h:mm A").toDate()
        let hoursPassed = msToTime(currentTime - cityTime)

        if (hoursPassed >= 3) {
            await tempManager.updateCity(city.name)
        }
    }

    renderer.renderData(tempManager.cityData)
}


const handleSearch = async cityInput => {
    await tempManager.getCityData(cityInput)
    renderer.renderData(tempManager.cityData)
}


$("#search-button").click(() => {
    handleSearch($("#city-input").val())
    $("#city-input").val("")
})

$(document).keypress(function (e) {
    var key = e.which
    if (key === 13) {
        handleSearch($("#city-input").val())
        $("#city-input").val("")
    }
})

$("#cities-container").on("click", ".add-button", function () {
    let name = $(this).siblings(".city-name").text()
    tempManager.saveCity(name)
    renderer.renderData(tempManager.cityData)
})

$("#cities-container").on("click", ".remove-button", function () {
    let name = $(this).siblings(".city-name").text()
    tempManager.removeCity(name)
    renderer.renderData(tempManager.cityData)
})

$("#cities-container").on("click", ".refresh-button", async function () {
    let name = $(this).closest(".last-update").siblings(".city-name").text()
    await tempManager.updateCity(name)
    renderer.renderData(tempManager.cityData)
})


loadPage()