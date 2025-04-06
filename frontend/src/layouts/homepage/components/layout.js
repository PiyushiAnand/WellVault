import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const HomepageLayout = ({ children }) => {
    return (
        <div className="homepage-layout">
            <Header />
            <main className="homepage-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default HomepageLayout;