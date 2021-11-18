import { Injectable } from '@angular/core';
import { OrderDetail } from '../model/order-detail';
import { Product } from '../model/product';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getCart(): OrderDetail[] {
    let cartJson = localStorage.getItem(Constants.LOCAL_STORAGE_KEY.CART);
    if (cartJson == null || cartJson == "")
      return [];
    return JSON.parse(cartJson);
  }

  addProductToCart(product: Product, qty: number = 1) {
    let cart: OrderDetail[] = [];
    let cartJson = localStorage.getItem(Constants.LOCAL_STORAGE_KEY.CART);
    if (cartJson != null)
      cart = JSON.parse(cartJson);

    let pExist = cart.find(x => x.ProductId == product.Id);
    if (pExist != null) {
      pExist.Qty += qty;
    }
    else {
      cart.push({
        Id: 0,
        ProductDiscountPrice: product.DiscountPrice,
        ProductId: product.Id,
        ProductImage: product.Image,
        ProductName: product.Name,
        ProductAlias: product.Alias,
        ProductPrice: product.Price,
        Qty: qty,
        Attributes: product.Attributes
      });
    }

    localStorage.setItem(Constants.LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
  }

  updateCart(cart: OrderDetail[]) {
    localStorage.setItem(Constants.LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(Constants.LOCAL_STORAGE_KEY.CART);
  }
}
