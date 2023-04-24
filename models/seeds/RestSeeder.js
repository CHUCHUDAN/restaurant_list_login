
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//引入rest model
const Rest = require('../rest')

//引入mongoose模組
const db = require('../../config/mongoose')

const User = require('../users')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantList: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantList: [3, 4, 5]
  },
]
//引入json檔案
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  Promise.all(
    SEED_USER.map(async (user, user_index) => {
      try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const createdUser = await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
        console.log('user created!')
        const dataList = restaurantList.results
        const userRestaurant = user.restaurantList.map(index => {
          const restaurant = dataList[index]
          restaurant.userId = createdUser._id
          return restaurant
        })
        await Rest.create(userRestaurant)
        console.log('restaurant created!')
      } catch (error) {
        console.error(error)
      }
    })
  ).then(() => {
    console.log('done')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
}
)