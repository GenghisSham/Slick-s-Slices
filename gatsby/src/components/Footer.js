import React from 'react';

export default function Footer() {
    return (
        <footer>
            <p className="center">&copy; Slick Slice's {new Date().getFullYear()}</p>
        </footer>
    );
}