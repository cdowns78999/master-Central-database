import React from 'react';

/**
 * BlogContent - Production High-Fidelity Blog Feed
 * Mirrors the canonical Green Shell blog feed.
 */
const BlogContent: React.FC = () => {
    return (
        <section className="blog-content">
            <h1 className="text-4xl font-roboto-condensed font-bold uppercase mb-10 border-b-4 border-[#82c341] inline-block pb-2">
                Blog Feed
            </h1>

            <div className="space-y-12">
                <article className="blog-post border-b border-gray-100 pb-10">
                    <h2 className="text-2xl md:text-3xl font-roboto-condensed font-bold uppercase mb-3">
                        <a href="/tiesto" className="hover:text-[#82c341] transition-colors">Ti&euml;sto, Hedex, and BassLayerz Unite for &lsquo;Click Click Click&rsquo;</a>
                    </h2>
                    <div className="meta text-sm text-gray-400 font-roboto-condensed uppercase mb-6">
                        June 8, 2024 By <span className="text-purple-700 font-bold">Lia Tabackman</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Ti&euml;sto, Hedex, and Basslayerz have joined forces to create an epic D&rsquo;n&rsquo;B track, &ldquo;Click Click Click,&rdquo; and it&rsquo;s nothing short of amazing...
                    </p>
                    <a href="/tiesto" className="text-xs font-bold text-purple-700 uppercase tracking-widest hover:underline">Read More &rarr;</a>
                </article>

                <article className="blog-post border-b border-gray-100 pb-10">
                    <h2 className="text-2xl md:text-3xl font-roboto-condensed font-bold uppercase mb-3">
                        <a href="/daylight" className="hover:text-[#82c341] transition-colors">Daylight Beach Club Las Vegas: Tactical Oasis</a>
                    </h2>
                    <div className="meta text-sm text-gray-400 font-roboto-condensed uppercase mb-6">
                        February 6, 2026 By <span className="text-purple-700 font-bold">Anti-Gravity AI</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        The ultimate strategic poolside experience. From high-noon sets to sunset showdowns, Daylight is the desert's premier tactical oasis...
                    </p>
                    <a href="/daylight" className="text-xs font-bold text-purple-700 uppercase tracking-widest hover:underline">Read More &rarr;</a>
                </article>
            </div>

            {/* Pagination Placeholder */}
            <div className="pagination flex justify-center gap-4 mt-12 py-8">
                <div className="w-10 h-10 border-2 border-[#82c341] flex items-center justify-center text-[#82c341] font-bold font-roboto-condensed">1</div>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-300 font-bold font-roboto-condensed hover:border-[#82c341] cursor-pointer">2</div>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-300 font-bold font-roboto-condensed hover:border-[#82c341] cursor-pointer">3</div>
            </div>
        </section>
    );
};

export default BlogContent;
