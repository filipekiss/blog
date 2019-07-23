import React from 'react';

export const Footer = () => {
    return (
        <footer className="text-center m-8 text-sm">
            🚀 &middot; a blog by{' '}
            <a href="https://twitter.com/filipekiss">filipe kiss</a> &middot;{' '}
            {new Date().getFullYear()}
        </footer>
    );
};

export default Footer;
