import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from  '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrdersPage({ data }) {
    const pizzas = data.pizzas.nodes;
    const { values, updateValue }  = useForm({
        name: '',
        email: '',
        spicySyrup: '',
    });
    const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({ pizzas, values });

    if(message) {
        return <p>{message}</p>;
    }

    return (
        <>
            <SEO title="Order a Pizza!" />
            <OrderStyles onSubmit={submitOrder}>
                <fieldset disabled={loading}>
                    <legend>Your Info</legend>

                    <label htmlFor="name">
                        Name
                        <input type="text" name="name" id="name" value={values.name} onChange={updateValue} />
                    </label>

                    <label htmlFor="email">
                        Email
                        <input type="email" name="email" id="email" value={values.email} onChange={updateValue}/>
                    </label>
                    
                    <input type="spicySyrup" name="spicySyrup" id="spicySyrup" value={values.spicySyrup} className="spicySyrup" onChange={updateValue}/>
                </fieldset>

                <fieldset disabled={loading} className="menu">
                    <legend>Menu</legend>
                    {pizzas.map( (pizza) => (
                        <MenuItemStyles key={pizza.id}>
                            <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
                            <div>
                                <h2>{pizza.name}</h2>
                            </div>
                            <div>
                                {['S', 'M', 'L'].map( (size) => (
                                    <button type="button" key={size} onClick={ () => addToOrder({ 
                                        id: pizza.id,
                                        size
                                    }) }>
                                        {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                                    </button>
                                ))}
                            </div>
                        </MenuItemStyles>
                    ))}
                </fieldset>

                <fieldset disabled={loading} className="order">
                    <legend>Order</legend>
                    <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
                </fieldset>

                <fieldset disabled={loading}>
                    <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
                    <div className='order-error'>
                        {error ? <p>Error : {error}</p> : ''}
                    </div>
                    <button type="submit" disabled={loading}>
                        <span aria-live="assertive" aria-atomic="true">
                            {loading ? 'Placing Order...' : ''}
                        </span>
                        {loading ? '' : 'Order Ahead'}
                    </button>
                </fieldset>
            </OrderStyles>
        </>
    );
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                id
                name
                slug {
                    current
                }
                price
                image {
                    asset {
                        fluid(maxWidth: 100) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;