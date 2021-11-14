import { action, computed, observable } from 'mobx'
import * as shop from '../api/shop' //把所有的输出包裹到obj对象中，可以直接调用shop.xxx
 
class CartStore {
  // 购物车存储的数据结构{id: 商品id, quantity: 购物车商品数量} price是需要计算的
  @observable items = [] //购物车
  @observable checkoutStatus = null 

  // 接收
  constructor (rootStore) {
    // 挂载到子容器，可以访问到根容器，然后根据根容器找到别的子容器
    this.rootStore = rootStore
  }
  @action.bound addToCart (product){ 
      console.log('addToCart', product)
      //判断购物车数据中是否已经有该商品
      // 如果有，则让购物车中的商品数量+1
      // 如果没有，则添加新的商品到购物车中
      const prod = this.items.find(cartItem => cartItem.id === product.id)
      console.log(prod,'prod')
      if (prod) {
        prod.quantity ++
      }else {
        this.items.push({
          id: product.id,
          quantity: 1
        })
      }
      // 在添加完购物车商品以后，需要让商品列表中的该商品库存数据-1
      this.rootStore.productsStore.decrementInventory(product)
  }
  // 基于原有可被观测数据衍生出的数据
  @computed get cartProducts () {
    const { productsStore } = this.rootStore
    return this.items.map(cartItem => {
      // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      // map() 方法按照原始数组元素顺序依次处理元素。
      const prod = productsStore.all.find(prodItem => prodItem.id === cartItem.id)
      return {
        id:prod.id,
        title:prod.title,
        price:prod.price,
        quantity:cartItem.quantity
      }
    })
  }

  @computed get totalPrice () {
    // reduce 是一个对数组累积操作的方法，在使用中一定要记得加return返回你希望累积操作的数据
    // 执行完最后一次跳出循环，reduce方法会返回最终的执行结果
    // 提供初始值时，循环从0开始，如果不提供，则循环从索引1开始
    // 完整的reduce 
    // array.reduce(function(accumulator, currentValue, currentIndex, array), initialValue)
    // initialValue：初始值，如没有，则把数组第一项作为初始值
    // accumulator：多次执行的累积结果
    // currentValue：数组循环当前处理的值
    // currentIndex：当前处理值的索引
    // array：当前正在被循环的数组
    return this.cartProducts.reduce((total, prod) =>{
      console.log(total,"total")
      console.log(prod,"prod")
      return total + prod.price * prod.quantity
    },0)
  }
  @action.bound checkout (products) {
    // 备份购物车数据
    const savedProducts = [...products]
    // 清空结算状态 
    this.setCheckoutStatus(null)
    // 清空购物车 防止结算没结束的时候，用户二次点击结算
    this.setItems([])
    // 发起结算请求
    //    如果成功：将结算状态设置为 successful
    //    如果失败：将结算状态设置为 failed，还原购物车数据
    shop.buyProducts(
      products,
      () => {
        this.setCheckoutStatus('successful')
      },
      () => {
        this.setCheckoutStatus('failed')
        this.setItems(savedProducts)
      }
    )
  }
  @action.bound setCheckoutStatus (status) {
    this.checkoutStatus = status
  }
  @action.bound setItems (items) {
    this.items = items
  }
}

export default CartStore