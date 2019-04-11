
class TempManager {
    constructor(){
        this.cityData = []
    }

    async getDataFromDB() {
        let cities = await $.get('./cities')
        if(cities) {
            this.cityData = cities
        }
    }

    async getCityData(cityName) {
        let city = await $.get(`./city/${cityName}`)
        this.cityData.push(city)
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