import styled from "styled-components";

const OrderStyles = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    fieldset {
        grid-column: span 2;
        max-height: 600px;
        overflow: auto;
        display: grid;
        gap: 1rem;
        align-content: start;

        &.menu, &.order {
            grid-column: span 1;
            align-content: flex-start;
        }

        .order-error {
            color: var(--red);
        }
    }

    .spicySyrup {
        display: none;
    }

    @media(max-width: 900px) {
        fieldset {
            &.menu, &.order {
                grid-column: span 2;
            }
        }
    }
`;

export default OrderStyles;