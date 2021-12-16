import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showCartHandler = () => {
    setModalIsOpen(true);
  };
  const hideCartHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <CartProvider>
      {modalIsOpen && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
