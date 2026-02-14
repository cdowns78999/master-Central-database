import React from 'react';

/**
 * DaylightVegasContent - High-fidelity venue block
 * Optimized for the production Green Shell environment.
 */
const DaylightVegasContent: React.FC = () => {
    return (
        <article className="venue-content">
            <header className="venue-header mb-8">
                <h1 className="text-4xl md:text-5xl font-roboto-condensed font-bold uppercase mb-6 leading-tight text-gray-900 border-b-4 border-[#82c341] inline-block pb-2">
                    Daylight Beach Club Las Vegas
                </h1>
            </header>

            <div className="featured-image mb-10 overflow-hidden border border-gray-100 shadow-sm">
                <img
                    src="https://whiteraverraft.wpenginepowered.com/wp-content/uploads/2013/05/daylight-vegas.jpg"
                    alt="Daylight Beach Club"
                    className="w-full h-auto object-cover"
                />
            </div>

            <div className="venue-body prose prose-lg prose-slate max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                    Daylight Beach Club at Mandalay Bay is the ultimate strategic poolside experience in Las Vegas. Boasting a massive stage and state-of-the-art sound system, it has become the premier sector for underground electronic artists and mainstream titans alike.
                </p>
                <p>
                    From high-noon sets to sunset showdowns, Daylight provides the desert's most sophisticated tactical oasis. Read on for the full logistics and upcoming artist deployment schedule.
                </p>
                <p>
                    Designed for high-impact electronic music events, Daylight features a sprawling pool deck, luxury cabanas, and a state-of-the-art stage that has hosted some of the biggest names in the industry.
                </p>
            </div>
        </article>
    );
};

export default DaylightVegasContent;
