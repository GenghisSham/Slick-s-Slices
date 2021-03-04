import React, { useState } from 'react';

// create order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
    // put state in here
    // const [order, setOrder] = useState('💩');
    const [order, setOrder] = useState([]);
    return (
        <OrderContext.Provider value={[order, setOrder]}>{children}</OrderContext.Provider>
    );
}

export default OrderContext;