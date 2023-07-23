import React from 'react'
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, resetCart } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modal';

const CartContainer = () => {
    const dispatch = useDispatch();
    const { cartItems, amount, total } = useSelector((state) => state.cart);

    if (amount < 1) {
        return (
            <section className='cart'>
                <h4>No products were found, add a product into your cart</h4>
                <button className="btn btn-clear" style={{marginLeft: '1rem'}} onClick={() => { dispatch(resetCart()) }}>Reset cart</button>
            </section>
        );
    }

    return (
        <section className="cart">
            <header>
                <p>There are {amount} products in your cart</p>
            </header>
            <div>
                {cartItems.map(cartItem => {
                    return <CartItem key={cartItem.id} {...cartItem} />
                })}
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>Total:  <span> R$ { total.toFixed(2) }</span> </h4>
                </div>
                <button className="btn btn-clear" onClick={() => { dispatch(openModal()) }}>Clear cart</button>
                <button className="btn btn-clear" style={{marginLeft: '1rem'}} onClick={() => { dispatch(resetCart()) }}>Reset cart</button>
            </footer>
        </section>
    );
}

export default CartContainer;