import { Cart } from './../../models/cart';
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

    constructor(private readonly storage: StorageService){}

    createOrClearCart() : Cart{
        const cart: Cart = {
            items: []
        }
        this.storage.setCart(cart);
        return cart;
    }

    get cart() : Cart {
        return this.storage.getCart() ?? this.createOrClearCart();
    }

    addProduto(produto: ProdutoDTO) : Cart {
        const cart: Cart = this.cart;
        const exists = cart.items.filter(i => i.produto.id == produto.id).length > 0;

        if (!exists) {
            cart.items.push({quantidade: 1, produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}