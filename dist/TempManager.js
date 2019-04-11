
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
        this._cityData.push(city)
    }

    saveCity(cityName) {
        for(let city of this.cityData) {
            if(cityName === city.name) {
                $.post(`./city`, city, function(response) { })
            }
        }
    }

    removeCity(cityName) {
        $.ajax({
            url: `./city/${cityName}`,
            method: "DELETE",
            success: function (response) { }
        })
    }
}

let test = new TempManager()