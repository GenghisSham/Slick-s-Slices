import React from 'react';
import Nav from './Nav';
import styled from 'styled-components';
import 'normalize.css';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const SiteBorderStyles = styled.div`
    max-width: 1000px;
    margin: 12rem auto 4rem auto;
    margin-top: clamp(2rem, 10vw, 12rem);
    background: white url(${stripes});
    background-size: 1500px;
    padding: 5px;
    padding: clamp(5px, 1vw, 25px);
    box-shadow: 0 0 5px 3px rgba(0, 0 , 0, 0.44);
    border: 5px solid white;
    @media(max-width:1100px) {
        martgin-left: 1.5rem;
        margin-right: 1.5rem;
    }
`;

const ContentStyles = styled.div`
    background: white;
    padding: 2rem;
`;

/* can use props as a parameter and then props.children: (props) -> {props.children}, OR
can destructure props and use {children} instead: ({children}) -> {children} */

export default function Layout( {children} ) {
    return (
        <>
            <GlobalStyles/>
            <Typography/>
            <SiteBorderStyles>
                <ContentStyles>
                    <Nav/>
                    {children}
                    <Footer/>
                </ContentStyles>
            </SiteBorderStyles>
        </>
    );
}