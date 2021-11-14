import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('cartStore') //把容器中的数据成员映射到组件中
@observer
class Cart extends Component {
  render(){
    const { cartStore } = this.props
    console.log(cartStore.cartProducts,"cartStore.cartProducts")
    return (
      <div>
        <h2>You Cart</h2>
        <p>{cartStore.foo}</p>
        <ul>
          {cartStore.cartProducts.map(item =>{
            return(
              <li key={item.id}>{item.title} - {item.price}*{item.quantity}</li>
            )
          })}
        </ul>
        <p>Total: {cartStore.totalPrice}</p>
        <p>
          <button 
            disabled={!cartStore.items.length}
            onClick={() => cartStore.checkout(cartStore.cartProducts)}
          >Checkout</button>
        </p>
        {
          cartStore.checkoutStatus && <p>Checkout {cartStore.checkoutStatus}</p>
        }
      </div>
    )
  }
}
export default Cart