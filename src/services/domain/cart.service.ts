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

    removeProduto(produto: ProdutoDTO) : Cart {
        
        const cart: Cart = this.cart;
        
        cart.items = cart.items.filter(item => item.produto.id != produto.id);

        this.storage.setCart(cart);

        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart {
        
        const cart: Cart = this.cart;
        const position = cart.items.findIndex(i => i.produto.id == produto.id);

        if (position != 1) {
            cart.items[position].quantidade += 1;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        
        let cart: Cart = this.cart;
        const position = cart.items.findIndex(i => i.produto.id == produto.id);

        if (position != 1) {
            cart.items[position].quantidade -= 1;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(cart.items[position].produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        const cart = this.cart;
        let total: number = 0;

        cart.items.forEach(item => {
            total += item.produto.preco * item.quantidade;
        });
        return total;
    }
}