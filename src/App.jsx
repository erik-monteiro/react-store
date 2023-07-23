import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { totalPrice, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
	const { cartItems, isLoading} = useSelector((store) => store.cart);
	const { isOpen } = useSelector((store) => store.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(totalPrice());
	}, [cartItems]);

	useEffect(() => {
		dispatch(getCartItems());
	}, []);

	if (isLoading) {
		return <h4>Loading...</h4>
	}

	return (
		<main>
			<Navbar />
			<CartContainer />
			{ isOpen && <Modal /> }
		</main>
	);
}
export default App;
