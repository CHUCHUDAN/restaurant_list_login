
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

//連線成功
// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER.name,
//       email: SEED_USER.email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id
//       const dataList = restaurantList.results
//       new Promise((resolve, reject) => {
//         for (const [rest_index, element] of dataList.entries()) {
//           Rest.create({
//             id: `${element.id}`,
//             name: `${element.name}`,
//             name_en: `${element.name_en}`,
//             category: `${element.category}`,
//             image: `${element.image}`,
//             location: `${element.location}`,
//             phone: `${element.phone}`,
//             google_map: `${element.google_map}`,
//             rating: `${element.rating}`,
//             description: `${element.description}`,
//             userId
//           }).then(() => {
//             Rest.find().count(function (err, count) {
//               if (count >= dataList.length) {
//                 console.log('done')
//                 resolve()
//               }
//             })
//           })
//         }
//       }).then(() => {
//         process.exit()
//       })
//     })
// })

// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER.name,
//       email: SEED_USER.email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id
//       const dataList = restaurantList.results
//       Promise.all(
//         dataList.map((element, rest_index) => {
//           return Rest.create({
//             id: `${element.id}`,
//             name: `${element.name}`,
//             name_en: `${element.name_en}`,
//             category: `${element.category}`,
//             image: `${element.image}`,
//             location: `${element.location}`,
//             phone: `${element.phone}`,
//             google_map: `${element.google_map}`,
//             rating: `${element.rating}`,
//             description: `${element.description}`,
//             userId
//           })
//         })
//       ).then(() => {
//         process.exit()
//       })
//     })
// })



// db.once('open', async () => {
//   try {
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(SEED_USER.password, salt)
//     const user = await User.create({
//       name: SEED_USER.name,
//       email: SEED_USER.email,
//       password: hash
//     })
//     const userId = user._id
//     const dataList = restaurantList.results
//     await Promise.all(
//       dataList.map(async (element) => {
//         try {
//           await Rest.create({
//             id: `${element.id}`,
//             name: `${element.name}`,
//             name_en: `${element.name_en}`,
//             category: `${element.category}`,
//             image: `${element.image}`,
//             location: `${element.location}`,
//             phone: `${element.phone}`,
//             google_map: `${element.google_map}`,
//             rating: `${element.rating}`,
//             description: `${element.description}`,
//             userId
//           })
//         } catch (error) {
//           console.error(error)
//         }
//       })
//     )
//     console.log('done')
//     process.exit()
//   } catch (error) {
//     console.error(error)
//   }
// })


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
