import React from 'react';

/**
 * HomeContent - Production High-Fidelity Landing Page
 * Mirrors the canonical static home page (Green Shell).
 */
const HomeContent: React.FC = () => {
    return (
        <div className="home-content">
            {/* HERO SECTION */}
            <section className="hero-section mb-8">
                <div className="featured-post relative h-[500px] overflow-hidden bg-black flex align-end">
                    <img
                        src="https://whiteraverraft.wpenginepowered.com/wp-content/uploads/2024/06/Tiesto-Hedex-Basslayerz.jpg"
                        className="featured-img absolute inset-0 w-full h-full object-cover opacity-70"
                        alt="Tiësto"
                    />
                    <div className="featured-overlay relative z-10 w-full p-10 bg-gradient-to-t from-black/90 to-transparent text-white self-end">
                        <span className="tag bg-[#82c341] text-black px-2.5 py-1 font-roboto-condensed font-bold uppercase text-[0.8rem] mb-4 inline-block">
                            Breaking News // D&B
                        </span>
                        <h2 className="text-4xl md:text-5xl font-roboto-condensed font-bold uppercase mb-4 leading-tight">
                            <a href="/tiesto" className="hover:underline">Tiësto, Hedex, and BassLayerz Unite for ‘Click Click Click’</a>
                        </h2>
                        <p className="text-lg opacity-90">Read the full tactical analysis of the summer's biggest drum and bass collaboration.</p>
                    </div>
                </div>
            </section>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <article className="post-card bg-white shadow-sm border border-gray-100">
                    <a href="/daylight">
                        <img
                            src="https://whiteraverraft.wpenginepowered.com/wp-content/uploads/2013/05/daylight-vegas.jpg"
                            alt="Daylight"
                            className="w-full h-56 object-cover"
                        />
                    </a>
                    <div className="p-6">
                        <div className="meta text-[0.75rem] text-gray-400 uppercase mb-3">Feb 6, 2026 // Venues</div>
                        <h3 className="text-xl font-roboto-condensed font-bold uppercase mb-3">
                            <a href="/daylight" className="hover:text-[#82c341] transition-colors">Daylight Beach Club Las Vegas: Tactical Oasis</a>
                        </h3>
                        <p className="text-gray-600 text-sm">Analysis of the desert's premier tactical poolside experience.</p>
                    </div>
                </article>

                <article className="post-card bg-white shadow-sm border border-gray-100">
                    <a href="/blog">
                        <img
                            src="https://raverrafting.com/wp-content/uploads/2013/06/diplo-fail-620x432.jpeg"
                            alt="Blog"
                            className="w-full h-56 object-cover"
                        />
                    </a>
                    <div className="p-6">
                        <div className="meta text-[0.75rem] text-gray-400 uppercase mb-3">Feb 6, 2026 // Content Stream</div>
                        <h3 className="text-xl font-roboto-condensed font-bold uppercase mb-3">
                            <a href="/blog" className="hover:text-[#82c341] transition-colors">View All Tactical Updates</a>
                        </h3>
                        <p className="text-gray-600 text-sm">Access the full stream of electronic music intelligence.</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default HomeContent;
