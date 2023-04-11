
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
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  },
]
//引入json檔案
const restaurantList = require('../../restaurant.json')

db.once('open', async () => {
  try {
    await Promise.all(
      SEED_USER.map(async (user, user_index) => {
        try {
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(user.password, salt)
          const createdUser = await User.create({
            name: user.name,
            email: user.email,
            password: hash
          })
          console.log('user created')
          const dataList = restaurantList.results
          const userRestaurant = []
          dataList.forEach((restaurant, rest_index) => {
            if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) {
              restaurant.userId = createdUser._id
              userRestaurant.push(restaurant)
            }
          })
          await Rest.create(userRestaurant)
        } catch (error) {
          console.error(error)
        }
      })
    )
    console.log('done')
    process.exit()
  } catch (error) {
    console.error(error)
  }
})
