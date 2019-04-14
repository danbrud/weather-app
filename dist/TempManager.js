
class TempManager {
    constructor() {
        this._cityData = []
    }

    get cityData() {
        return this._cityData
    }

    async getDataFromDB() {
        let cities = await $.get('./cities')
        if (cities) {
            this._cityData = cities
        }
    }

    async getCityData(cityName) {
        let city = await $.get(`./city/${cityName}`)
        if (city != 0) {
            city.new = true
            this._cityData.push(city)
        } else {
            return -1
        }
    }

    saveCity(cityName) {
        for (let city of this._cityData) {
            if (cityName === city.name) {
                city.new = false
                $.post(`./city`, city, function (response) { })
            }
        }
    }

    removeCity(cityName) {
        let cityIndex = this._cityData.findIndex(c => c.name === cityName)
        this._cityData.splice(cityIndex, 1)

        $.ajax({
            url: `./city/${cityName}`,
            method: "DELETE",
            success: function (response) { }
        })
    }

    async updateCity(cityName) {
        let response = await $.ajax({
            url: `./city/${cityName}`,
            method: "PUT",
            success: (newCity) => {
                let i = this._cityData.findIndex(c => c.name === cityName)
                this._cityData.splice(i, 1, newCity)
            }
        })

        return response
    }
}