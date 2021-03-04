import formatMoney from "./formatMoney";
import calculatePizzaPrice from "./calculatePizzaPrice";

export default function attachNamesAndPrices(orders, pizzas) {
    return orders.map(item => {
        const pizza = pizzas.find( (pizza) => pizza.id === item.id);

        return {
            ...item,
            name: pizza.name,
            thumbnail: pizza.image.asset.fluid.src,
            price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
        };
    });
}