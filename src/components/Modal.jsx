import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modal';

const Modal = () => {
    const dispatch = useDispatch();

    return (
        <aside className='modal-container'>
            <div className="modal">
                <h4>remove all items from cart?</h4>
                <button className="btn confirm-btn" onClick={() => { dispatch(clearCart()), dispatch(closeModal()) }}>yes</button>
                <button className="btn clear-btn" onClick={() => { dispatch(closeModal()) }}>no</button>
            </div>
        </aside>
    )
}

export default Modal;