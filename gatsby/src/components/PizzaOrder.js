import Img from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder, }) {
    return (
        <>
            <p>You have {order.length} items in your order.</p>

            {order.map( (singleOrder, index) => {
                const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
                return <MenuItemStyles key={`${singleOrder.id}-${index}`}>
                    <Img fluid={pizza.image.asset.fluid} />
                    <h2>{pizza.name}</h2>
                    <p>{formatMoney( calculatePizzaPrice( pizza.price, singleOrder.size ) )}</p>
                    <button 
                        type="button" 
                        className="remove" 
                        title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
                        onClick={ () => removeFromOrder(index) }>
                        &times;
                    </button>
                </MenuItemStyles>
            })}
        </>
    );
}