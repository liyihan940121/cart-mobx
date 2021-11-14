import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('productsStore', 'cartStore') //把容器中的数据成员映射到组件中
@observer
class Products extends Component {

  componentDidMount(){
    this.props.productsStore.getAllProducts()
  }

  render(){
    const { productsStore, cartStore } = this.props
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {
            productsStore.all.map(item => {
              return(
                <li key={item.id}>
                  {item.title} - {item.price} * {item.inventory}
                  <br />
                  <button 
                    disabled={!item.inventory}
                    onClick={()=>{ cartStore.addToCart(item) }}>{item.inventory ? 'Add to cart' : 'Sold Out'}</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default Products