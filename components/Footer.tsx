
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white mt-12 py-6 border-t border-slate-200">
            <div className="container mx-auto px-4 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} Instant Invoice Generator. All Rights Reserved.</p>
                <p className="text-sm mt-1">Built for speed and simplicity.</p>
            </div>
        </footer>
    );
};

export default Footer;
