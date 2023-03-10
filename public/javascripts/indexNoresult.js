const dropdownSort = document.querySelector('#dropdownSort')
dropdownSort.addEventListener('click', (event) => {
  const keyword = document.querySelector('#search-input').value
  console.log(keyword)
  const target = event.target
  const sort = target.value
  window.location.href = ReplaceUrlParam(keyword, window.location.href, 'sort', sort)
})



function ReplaceUrlParam(keyword, url, key, value) {
  let nowUrl = new URL(url) // 給予參數url並構建URL物件
  let queryStr = new URLSearchParams(nowUrl.search) //nowUrl.search為查詢參數網址
  queryStr.set(key, value)
  let fixUrl = '?' + queryStr.toString()
  console.log(fixUrl)
  if (keyword) return fixUrl
  fixUrl = '/searchSort' + fixUrl
  return fixUrl
}
