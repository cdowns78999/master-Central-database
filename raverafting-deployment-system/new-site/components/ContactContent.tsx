import React from 'react';

/**
 * ContactContent - High-fidelity Contact page
 * Aligned with the canonical Green/Black branding.
 */
const ContactContent: React.FC = () => {
    return (
        <section className="contact-content">
            <div className="directive-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="directive-block bg-gray-50 border-l-4 border-purple-600 p-6 shadow-sm">
                    <h3 className="text-purple-700 text-xl font-bold font-roboto-condensed uppercase tracking-wide mb-4">Submissions</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Send your music submissions to <strong>Writing Staff</strong>
                    </p>
                    <p className="text-xs text-gray-500 italic mt-4">
                        *submissions to RaverRafting do not guarantee coverage.
                    </p>
                </div>

                <div className="directive-block bg-gray-50 border-l-4 border-[#82c341] p-6 shadow-sm">
                    <h3 className="text-[#82c341] text-xl font-bold font-roboto-condensed uppercase tracking-wide mb-4">Advertising</h3>
                    <p className="text-gray-700 leading-relaxed">
                        For sponsored content or partnerships, please contact <strong>Mike Mowery</strong> or <strong>Han Kim</strong>.
                    </p>
                </div>
            </div>

            <div className="staff-section bg-white border border-gray-100 p-8 shadow-sm">
                <h3 className="text-gray-900 text-xs uppercase tracking-[4px] font-bold mb-6 pb-2 border-b border-gray-100">Writing Staff</h3>
                <ul className="space-y-3 font-roboto-condensed text-sm text-gray-600">
                    {[
                        "Joshua Schellhammer - josh@raverrafting.com",
                        "Phil Mortillo - philip@raverrafting.com",
                        "Bianca Benjamin - bianca@raverrafting.com",
                        "Chad Downs - chad@raverrafting.com"
                    ].map((staff, idx) => (
                        <li key={idx} className="hover:text-purple-700 cursor-pointer transition-colors border-b border-gray-50 pb-2">
                            {staff}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ContactContent;
