import React from 'react';
import Layout from './Layout';
import NotFoundContent from './NotFoundContent';

/**
 * NotFoundPage - Canonical 404 page for the React app.
 * Direct wrapper of the NotFoundContent within the High-Fidelity Layout.
 */
const NotFoundPage: React.FC = () => {
    return (
        <Layout title="404 Fail">
            <NotFoundContent />
        </Layout>
    );
};

export default NotFoundPage;
