import React from 'react';

/**
 * ActivateContent - Tactical system activation block
 * Designed as a placeholder for the /activate/ route.
 */
const ActivateContent: React.FC = () => {
    return (
        <section className="activate-content tactical-node p-8 md:p-16 text-center">
            <div className="max-w-3xl mx-auto space-y-12">
                <header>
                    <div className="text-[#00ffcc] text-xs uppercase tracking-[4px] mb-2">System Protocol // 003</div>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white mb-4">
                        Activate
                    </h1>
                    <div className="h-1 w-24 bg-[#00ffcc] mx-auto opacity-50"></div>
                </header>

                <div className="status-grid grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="status-item bg-white/5 p-6 border border-white/10 rounded">
                        <div className="text-[#ff00ff] text-xs uppercase font-bold mb-2">Status</div>
                        <div className="text-white font-mono text-lg">AWAITING_INPUT</div>
                    </div>
                    <div className="status-item bg-white/5 p-6 border border-white/10 rounded">
                        <div className="text-[#00ffcc] text-xs uppercase font-bold mb-2">Zone</div>
                        <div className="text-white font-mono text-lg">ENCRYPTED</div>
                    </div>
                </div>

                <p className="text-[#a0a0a0] max-w-lg mx-auto leading-relaxed">
                    This terminal is currently in standby mode. Please provide valid authorization credentials to activate the full RaveRafting intelligence stream.
                </p>

                <div className="activation-trigger py-8">
                    <button className="px-12 py-4 border-2 border-[#00ffcc] text-[#00ffcc] uppercase tracking-[4px] font-bold hover:bg-[#00ffcc] hover:text-[#0a0a0c] transition-all duration-300">
                        Initialize Uplink
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ActivateContent;
