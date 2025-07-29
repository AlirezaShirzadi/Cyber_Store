export interface CartItem {
    product_id: number;
    quantity_change: 1 | -1;
    game_account_id?: number;
}
