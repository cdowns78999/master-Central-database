import React from 'react';

/**
 * AboutContent - Canonical About page content block
 * High-fidelity implementation mirroring the Green/Black shell.
 */
const AboutContent: React.FC = () => {
    return (
        <section className="about-content">
            <div className="prose prose-slate max-w-none text-lg leading-relaxed text-gray-700 space-y-6">
                <p>
                    RaverRafting.com is a leading source for electronic dance music news, artist profiles, music reviews and event information. Founded in 2011, RaverRafting.com has seen over three million unique visitors and its community has thousands of members on Facebook, Twitter and other social media sites.
                </p>
                <p className="contact-info mt-8">
                    Feel free to email us at <strong className="text-purple-700">info@raverrafting.com</strong>
                </p>
            </div>
        </section>
    );
};

export default AboutContent;
