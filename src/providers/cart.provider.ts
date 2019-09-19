/**
 * ====================================================
 *
 * Created by anele on 2019/06/23.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const CART_KEY = 'cartItems';

@Injectable()
export class CartProvider {

    constructor(public storage: Storage) {}

    removeAllCartItems() {
        return this.storage.remove(CART_KEY).then(res => {
            return res;
        });
    }


    getCartItems() {
        return this.storage.get(CART_KEY);
    }


    containsObject(obj, list): boolean {
        if (!list.length) { return false; }

        if (obj == null) { return false; }

        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].product_id == obj.product_id) {
                return true;
            }
        }
        return false;
    }


    removeFromCart(product) {
        return this.getCartItems().then(result => {
            if (result) {
                let productIndex = result.indexOf(product);
                result.splice(productIndex, 1);
                return this.storage.set(CART_KEY, result);
            }
        })
    }

    
    addToCart(product) {
        return this.getCartItems().then(result => {
            if (result) {
                if (!this.containsObject(product, result)) {
                    result.push(product);
                    return this.storage.set(CART_KEY, result);
                } else {
                    let index = result.findIndex((x) =>
                        x.product_id == product.product_id
                    );

                    let prevQuantity = parseInt(result[index].count);
                    product.count = (prevQuantity + product.count);

                    let currentPrice = (parseInt(product.totalPrice) * product.count);
                    product.totalPrice =currentPrice;
                    result.splice(index, 1);
                    result.push(product);
                    return this.storage.set(CART_KEY, result);
                }

            } else {
                return this.storage.set(CART_KEY, [product]);
            }
        })
    }



}