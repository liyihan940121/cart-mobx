import ProductsStore from "./products"
import CartStore from "./cart"

class RootStore {
  constructor () {
    // 为了容器之间的相互通信，将根容器传递进去
    this.productsStore = new ProductsStore(this)
    this.cartStore = new CartStore(this)
  }
}

export default RootStore