
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

    getCityData() {
        
    }
}