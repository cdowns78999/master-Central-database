import React from 'react';

/**
 * NotFoundContent - Canonical 404 content block
 * Aligned with the high-fidelity Green/Black shell.
 */
const NotFoundContent: React.FC = () => {
    return (
        <section className="not-found-content flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl mx-auto space-y-8">
                <img
                    className="diplo-fail rounded shadow-lg border border-gray-200"
                    src="http://raverrafting.com/wp-content/uploads/2013/06/diplo-fail-620x432.jpeg"
                    alt="diplo-fail"
                    width="620"
                    height="432"
                />

                <p className="status-message text-xl text-gray-600 font-medium">
                    Sorry homie but either you clicked a bad link or we just couldn't find that post.
                </p>
            </div>
        </section>
    );
};

export default NotFoundContent;
