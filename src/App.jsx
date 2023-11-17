import {useState } from 'react';
import './App.css';
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { getData } from './constants/db';

const sneakers = getData();


const App = () => {
	const [cartItems, setCartItems] = useState([]);

	const onAddItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem) {
			const newData = cartItems.map(c =>
				c.id == item.id
					? { ...existItem, quantity: existItem.quantity + 1 }
					: c
			);
			setCartItems(newData);
		} else {
			const newData = [...cartItems, { ...item, quantity: 1 }];
			setCartItems(newData);
		}
	};

	const onRemoveItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem.quantity === 1) {
			const newData = cartItems.filter(c => c.id !== existItem.id);
			setCartItems(newData);
		} else {
			const newData = cartItems.map(c =>
				c.id === existItem.id
					? { ...existItem, quantity: existItem.quantity - 1 }
					: c
			);
			setCartItems(newData);
		}
	};



	return (
		<>
			<h1 className='heading'>Telegram Shop</h1>
			<Cart cartItems={cartItems} />
			<div className='cards__container'>
				{sneakers.map(sneaker => (
					<Card
						key={sneaker.id}
						sneaker={sneaker}
						onAddItem={onAddItem}
						onRemoveItem={onRemoveItem}
					/>
				))}
			</div>
		</>
	);
};

export default App;
