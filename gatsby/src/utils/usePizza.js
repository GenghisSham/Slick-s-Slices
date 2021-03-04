import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import formatMoney from "./formatMoney";
import calculateOrderTotal from "./calculateOrderTotal";
import attachNamesAndPrices from "./attachNamesAndPrices";

export default function usePizza({ pizzas, values }) {
    // create a state to hold order

    // we commmented this out because we moved useState up to the provider
    // const [order, setOrder] = useState([]);
    
    // now we access both state and updater function (setOrder) via context
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // make function to add things to order
    function addToOrder(orderedPizza) {
        setOrder([
            ...order,
            orderedPizza,
        ]);
    }

    // make function to remove things to order
    function removeFromOrder(index) {
        setOrder([
            //everything before item we want to remove
            ...order.slice(0, index),
            //everything after item we want to remove
            ...order.slice(index + 1),
        ]);
    }

    // this is run when someone submits the form
    async function submitOrder(e) {
        e.preventDefault();
        // console.log(e);
        setLoading(true);
        // setError('no wayyyy');
        setError(null);
        // setMessage(null);
        // setMessage('Go Eat!');

        // gather data
        const body = {
            order : attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            spicySyrup: values.spicySyrup,
        };
        // console.log(body);

        // send data to serverless function when user checks out
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const text = JSON.parse( await res.text()  );

        // check if everything worked
        if( res.status >= 400 && res.status < 600 ) {
            setLoading(false);
            setError(text.message);
        }
        else {
            setLoading(false);
            setMessage('Success! Come on down for your pizza!');
        }
    }


    return {
        order, 
        addToOrder, 
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    };
}