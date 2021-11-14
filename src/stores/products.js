import { observable, action } from 'mobx'
import * as shop from '../api/shop'
 
class ProductsStore {
 
  @observable all = []
  // 接收
  constructor (rootStore) {
    // 挂载到子容器，可以访问到根容器，然后根据根容器找到别的子容器
    this.rootStore = rootStore
  }
  // 通过action来获取数据，进行接口赋值操作
  @action.bound getAllProducts () {
    shop.getAllProducts(products => {
      // 在异步中对数据进行赋值，可以用runInAction或在调用action
      this.setAll(products)
    })
  }
  @action.bound setAll (products) {
    this.all = products
  }
  @action.bound decrementInventory (product) {
    const prod = this.all.find(item => item.id === product.id)
    prod.inventory--
  }
 
}

export default ProductsStore