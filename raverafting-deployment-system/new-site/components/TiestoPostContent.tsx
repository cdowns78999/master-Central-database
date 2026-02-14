import React from 'react';

/**
 * TiestoPostContent - Production High-Fidelity Article Block
 * Designed to be wrapped by the master Layout component.
 */
const TiestoPostContent: React.FC = () => {
    return (
        <article className="post-content">
            <header className="post-header mb-8">
                <div className="post-meta text-[0.85rem] text-gray-500 font-roboto-condensed uppercase mb-3 flex items-center gap-2">
                    <span>June 8, 2024</span>
                    <span className="text-gray-300">|</span>
                    <span>By <strong className="text-purple-700">Lia Tabackman</strong></span>
                </div>
                <h1 className="text-4xl md:text-5xl font-roboto-condensed font-bold uppercase mb-6 leading-tight text-gray-900 border-b-4 border-[#82c341] inline-block pb-2">
                    Tiësto, Hedex, and BassLayerz Unite for ‘Click Click Click’
                </h1>
            </header>

            <div className="featured-image mb-10 overflow-hidden border border-gray-100 shadow-sm">
                <img
                    src="https://whiteraverraft.wpenginepowered.com/wp-content/uploads/2024/06/Tiesto-Hedex-Basslayerz.jpg"
                    alt="Tiësto, Hedex, and Basslayerz"
                    className="w-full h-auto object-cover"
                />
            </div>

            <div className="post-body prose prose-lg prose-slate max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                    <span className="text-5xl font-bold float-left mr-3 mt-1 leading-none text-purple-700">T</span>
                    iësto, Hedex, and Basslayerz have joined forces to create an epic D’n’B track, “Click Click Click,” and it’s nothing short of amazing. This collaboration brings together three heavy-hitters in the electronic music world, each contributing their unique style to create a track that is sure to dominate the summer.
                </p>
                <blockquote className="border-l-4 border-[#82c341] pl-6 italic text-gray-500 my-10 bg-gray-50 py-4 font-roboto-condensed text-xl">
                    "This track is a masterclass in modern drum and bass production, merging Ti&euml;sto's legendary versatility with the cutting-edge energy of the UK underground."
                </blockquote>
                <p>
                    Known for his versatility and constant innovation, Ti&euml;sto seamlessly integrates with the high-energy sounds of Hedex and the gritty baselines of Basslayerz. The result is a high-octane anthem that perfectly captures the current tactical shift in the electronic sphere.
                </p>
                <p>
                    With over 8 billion global streams and countless GRAMMY awards, Ti&euml;sto continues to define the pulse of the industry, while Hedex and Basslayerz represent the rising frequency of the tactical D&B movement.
                </p>
            </div>
        </article>
    );
};

export default TiestoPostContent;
