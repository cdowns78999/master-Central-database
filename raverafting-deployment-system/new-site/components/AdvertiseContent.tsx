import React from 'react';

/**
 * AdvertiseContent - Canonical Advertise page content block
 * High-fidelity implementation based on original WordPress source.
 */
const AdvertiseContent: React.FC = () => {
    return (
        <section className="advertise-content tactical-node p-8 md:p-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center">
                    <div className="text-[#00ffcc] text-xs uppercase tracking-[4px] mb-2">Business Operations // Asset 004</div>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white mb-4">
                        Advertise
                    </h1>
                    <h2 className="text-xl md:text-2xl text-[#ff00ff] font-medium tracking-wide">
                        Why RaverRafting.com?
                    </h2>
                </header>

                <div className="prose prose-invert max-w-none text-lg leading-relaxed text-white/80 space-y-8">
                    <p>
                        Founded in 2011, RaverRafting.com is a top electronic dance media company with more than 650,000 monthly visitors. Through compelling <a href="https://stellarspins-au.com/" rel="dofollow" className="text-[#00ffcc] underline">StellarSpins Australia</a> photography, in-depth artist features, festival reviews and free downloads, RR covers the different genres that make up EDM and the culture surrounding it.
                    </p>

                    <p>
                        We engage with our readership through mediums like music festivals, email marketing and social media. Your message, music or brand will able to reach key influencers and they can share it across the world.
                    </p>

                    <p>
                        Our display advertising offers a wide range of marketing and development services designed to enhance our client's influence and distribute information socially through the web.
                    </p>

                    <div className="daily-ops bg-white/5 border border-white/10 p-8 rounded-lg">
                        <h3 className="text-[#00ffcc] uppercase tracking-[2px] font-bold mb-6">Here are some things we do everyday:</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                            {[
                                "Music previews, releases and distribution",
                                "Event promotion, giveaways and ticket sales",
                                "Media partnerships and sponsored content creation",
                                "Artist website, biography and social profile strategy",
                                "Blog outreach and content distribution",
                                "Social media marketing campaign creation"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-white/90">
                                    <span className="text-[#ff00ff] mt-1">▶</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p>
                        We know dance music because we live it. Going from an ordinary blog to an authority in the space, has given us incredible insight into the best practices for online promotion. Let us help you.
                    </p>

                    <div className="contact-mission border-t border-white/10 pt-8 text-center">
                        <p className="text-[#a0a0a0] mb-4">For more information and our media kit, please contact:</p>
                        <p className="text-2xl font-bold text-[#00ffcc] tracking-wider font-mono">han@raverrafting.com</p>
                    </div>

                    <footer className="pt-8 opacity-40 text-xs italic tracking-wide text-center">
                        *Rebranded to RaverRafting from WhiteRaverRafting on June 1st, 2015.
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default AdvertiseContent;
