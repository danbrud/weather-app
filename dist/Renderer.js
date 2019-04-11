
class Renderer {
    renderData(allCityData) {
        let source = $("#city-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ allCityData })
        
        $("#cities-container").empty().append(newHTML)
    } 
}