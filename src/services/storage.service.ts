import { Cart } from './../models/cart';
import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/localUser';
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if (!user || user == null) {
            return null;
        }
        return JSON.parse(user);
    }

    setLocalUser(user: LocalUser) {

        if (user == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
    }

    getCart() : Cart {
        const cartString = this.getItem(STORAGE_KEYS.cart);

        return cartString ? JSON.parse(cartString) : null;
    }

    setCart(cart: Cart) {
        if (cart) {
            this.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        } else {
            this.remove(STORAGE_KEYS.cart);
        }
    }

    setItem(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    getItem(name: string) {
        return localStorage.getItem(name);
    }

    remove(name: string) {
        localStorage.removeItem(name);
    }


    
}