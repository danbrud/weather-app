
class TempManager {
    constructor(){
        this._cityData = []
    }

    get cityData() {
        return this._cityData
    }

    async getDataFromDB() {
        let cities = await $.get('./cities')
        if(cities) {
            this._cityData = cities
        }
    }

    async getCityData(cityName) {
        let city = await $.get(`./city/${cityName}`)
        city.new = true
        this._cityData.push(city)
    }

    saveCity(cityName) {
        for(let city of this._cityData) {
            if(cityName === city.name) {
                city.new = false
                $.post(`./city`, city, function(response) { })
            }
        }
    }

    removeCity(cityName) {
        let city = this._cityData.find(c => c.name === cityName)
        city.new = true

        $.ajax({
            url: `./city/${cityName}`,
            method: "DELETE",
            success: function (response) { }
        })
    }

    updateCity(cityName) {
        $.ajax({
            url: `./city/${cityName}`,
            method: "PUT",
            success: function (newCity) { 
                let city = this._cityData.find(c => c.name === cityName)
                city.updatedAt = newCity.updatedAt
                city.temperature = newCity.temperature
                city.condition = newCity.condition
                city.conditionPic = newCity.conditionPic   
            }
        })
    }
}

let test = new TempManager()