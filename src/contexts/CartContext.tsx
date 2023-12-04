import React, { createContext, useContext, useReducer } from "react";

import { Product } from "../types/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import useMe from "../hooks/useMe";

export interface CartProduct {
  product: Product;
  quantity: number;
}

type CartReducerAction =
  | {
      type: "add" | "remove" | "update";
      cartProduct: CartProduct;
    }
  | {
      type: "clear";
    };

interface CartContextProviderProps {
  children: React.ReactNode;
}

// Reducer
const reducer = (cart: CartProduct[], action: CartReducerAction) => {
  switch (action.type) {
    case "add": {
      return [...cart, action.cartProduct];
    }
    case "remove": {
      return cart.filter((cartProduct) => cartProduct.product.id !== action.cartProduct.product.id);
    }
    case "update": {
      return cart.map((cartProduct) => {
        if (cartProduct.product.id === action.cartProduct.product.id) {
          return action.cartProduct;
        }

        return cartProduct;
      });
    }
    case "clear": {
      return [];
    }
  }
};

// Context and provider
export const Context = createContext<[CartProduct[], React.Dispatch<CartReducerAction>]>([[], () => {}]);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const cartReducer = useReducer(reducer, []);

  return <Context.Provider value={cartReducer}>{children}</Context.Provider>;
};

// Hook
export const useCart = () => {
  const [cart, dispatch] = useContext(Context);

  const getTotalPrice = React.useCallback(() => {
    return cart.reduce((total, cartProduct) => total + cartProduct.product.price * cartProduct.quantity, 0);
  }, [cart]);

  const addToCart = React.useCallback(
    (product: Product) => {
      const cartProduct = cart.find((cartProduct) => cartProduct.product.id === product.id);
      const isAlreadyInCart = !!cartProduct;

      if (isAlreadyInCart) {
        const updatedCartProduct = { ...cartProduct, quantity: cartProduct.quantity + 1 };
        return updateProductQuantity(updatedCartProduct, updatedCartProduct.quantity);
      }

      return dispatch({ type: "add", cartProduct: { product, quantity: 1 } });
    },
    [cart, dispatch]
  );

  const removeFromCart = React.useCallback(
    (cartProduct: CartProduct) => {
      return dispatch({ type: "remove", cartProduct });
    },
    [cart, dispatch]
  );

  const updateProductQuantity = React.useCallback(
    (cartProduct: CartProduct, newQuantity: number) => {
      return dispatch({
        type: "update",
        cartProduct: { ...cartProduct, quantity: newQuantity },
      });
    },
    [cart, dispatch]
  );

  const clearCart = React.useCallback(() => {
    return dispatch({ type: "clear" });
  }, [dispatch]);

  return {
    cart,
    getTotalPrice,
    addToCart,
    removeFromCart,
    updateProductQuantity,
    clearCart,
  };
};

export default CartContextProvider;
