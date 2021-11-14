const _products = [
  {"id": 1, "title": "ipad", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "imac", "price": 1999.09, "inventory": 10},
  {"id": 3, "title": "iphone", "price": 500, "inventory": 5}
]
// 模拟一个异步方法
export const getAllProducts = callback => {
  setTimeout(function () {
    callback(_products)
  }, 100)
}
export const buyProducts = (products, callback, errorCallback) => {
  setTimeout(() => {
    Math.random() > 0.5 ? callback() : errorCallback()
  },100)
}