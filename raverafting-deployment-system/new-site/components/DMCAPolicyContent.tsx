import React from 'react';

/**
 * DMCAPolicyContent - High-fidelity Compliance block
 * Implements the full DMCA notice and infringement notification protocols.
 */
const DMCAPolicyContent: React.FC = () => {
    return (
        <section className="dmca-policy-content tactical-node p-8 md:p-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center border-b border-white/10 pb-8">
                    <div className="text-[#ff0000] text-xs uppercase tracking-[4px] mb-2 font-bold font-mono">[ LEGAL_COMPLIANCE_DMCA ]</div>
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">DMCA Policy</h1>
                </header>

                <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed">
                    <p>
                        <strong className="text-[#00ffcc]">RaverRafting.com</strong> is in compliance with 17 U.S.C. * 512 and the Digital Millennium Copyright Act (*DMCA*). It is our policy to respond to any infringement notices and take appropriate actions under the Digital Millennium Copyright Act (*DMCA*) and other applicable intellectual property laws.
                    </p>

                    <p>
                        If your copyrighted material has been posted on <strong>RaverRafting.com</strong> or if links to your copyrighted material are returned through our search engine and you want this material removed, you must provide a written communication that details the information listed in the following section.
                    </p>

                    <div className="bg-white/5 p-6 border border-white/10 rounded-lg text-sm italic">
                        If we take such measures, we will make a good-faith attempt to contact the sender who transmitted the content so that he or she may make a counter notification pursuant to sections 512(g)(2) and (3) of the DMCA. It is our policy to document all notices of alleged infringement on which we act.
                    </div>

                    <h3 className="text-[#00ffcc] text-xl font-bold uppercase tracking-wide pt-8 border-t border-white/10">Infringement Notification</h3>

                    <p>
                        If you are a copyright owner or an authorized agent thereof and believe that any user of the Pando application has infringed upon your copyrights, you may submit a notification pursuant to the DMCA by filing a notice of infringement with our Copyright Agent.
                    </p>

                    <div className="bg-[#ff0000]/10 border border-[#ff0000]/30 p-6 rounded-lg">
                        <p className="text-white font-bold mb-2 uppercase tracking-wide">Warning regarding material misrepresentation:</p>
                        <p className="text-sm">Please note that you will be liable for damages (including costs and attorneys' fees) if you materially misrepresent that a product or activity is infringing your copyrights.</p>
                    </div>

                    <h4 className="text-white uppercase tracking-widest text-sm font-bold pt-4">Required Documentation Format:</h4>
                    <ol className="space-y-4 list-decimal pl-6 marker:text-[#ff00ff] marker:font-bold">
                        <li>Identify in sufficient detail the copyrighted work that you believe has been infringed upon.</li>
                        <li>Identify the material that you claim is infringing the copyrighted work listed in item #1 above.</li>
                        <li>Provide information reasonably sufficient to permit WhiteRaverRafting.com to locate the material.</li>
                        <li>Provide contact information (email address, telephone number and a mailing address).</li>
                        <li>Provide information to permit WhiteRaverRafting.com to notify the user that allegedly sent infringing material.</li>
                        <li className="italic">Include the following statement: "I have a good faith belief that use of the copyrighted materials in the manner complained of is not authorized by the copyright owner, its agent, or the law."</li>
                        <li className="italic">Include the following statement: "I swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed."</li>
                        <li className="font-bold">Sign the paper.</li>
                        <li className="font-mono text-[#00ffcc] font-bold">Send to: chad@raverrafting.com</li>
                    </ol>

                    <p className="pt-8 text-white/40 text-xs italic">
                        You hereby acknowledge that if you fail to comply with all the of the requirements set forth above, your DMCA notice may not be valid.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DMCAPolicyContent;
