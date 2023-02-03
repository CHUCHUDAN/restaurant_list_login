//引入rest model
const Rest = require('../rest')

//引入mongoose模組
const db = require('../../config/mongoose')

//引入json檔案
const restaurantList = require('../../restaurant.json')

//連線成功
db.once('open', () => {
  restaurantList.results.forEach(element => {
    Rest.create({
      id: `${element.id}`,
      name: `${element.name}`,
      name_en: `${element.name_en}`,
      category: `${element.category}`,
      image: `${element.image}`,
      location: `${element.location}`,
      phone: `${element.phone}`,
      google_map: `${element.google_map}`,
      rating: `${element.rating}`,
      description: `${element.description}`
    })
  })
})