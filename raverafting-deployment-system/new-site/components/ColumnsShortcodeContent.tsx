import React from 'react';

/**
 * ColumnsShortcodeContent - High-fidelity grid demonstration
 * Renders the exact column configurations and sample content from the original WordPress source.
 */
const ColumnsShortcodeContent: React.FC = () => {
    const ColumnBox: React.FC<{ children: React.ReactNode; label?: string; className?: string }> = ({ children, label, className }) => (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{label}</div>}
            <div className="bg-white/5 border border-white/10 p-6 rounded relative group hover:border-[#00ffcc]/30 transition-colors">
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-white/80">
                    {children}
                </div>
            </div>
        </div>
    );

    const Dropcap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const text = children?.toString() || "";
        return (
            <span>
                <span className="float-left text-4xl font-bold text-[#00ffcc] mr-2 mt-1 leading-none">
                    {text.charAt(0)}
                </span>
                {text.slice(1)}
            </span>
        );
    };

    return (
        <section className="columns-shortcode-content tactical-node p-8 md:p-16 space-y-16">
            <header className="text-center mb-12">
                <div className="text-[#00ffcc] text-xs uppercase tracking-[4px] mb-2 font-bold font-mono">[ LAYOUT_LOGIC_DEPLOYMENT ]</div>
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">Columns Shortcode</h1>
            </header>

            {/* 2 Columns */}
            <div className="section-block space-y-6">
                <h4 className="text-[#ff00ff] uppercase tracking-widest font-bold text-sm border-l-2 border-[#ff00ff] pl-4">2 Columns Contents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ColumnBox label="[one_half]">
                        <Dropcap>1Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                    <ColumnBox label="[one_half_last]">
                        <Dropcap>2Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                </div>
            </div>

            {/* 3 Columns */}
            <div className="section-block space-y-6">
                <h4 className="text-[#ff00ff] uppercase tracking-widest font-bold text-sm border-l-2 border-[#ff00ff] pl-4">3 Columns Contents</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ColumnBox label="[one_third]">
                        <Dropcap>1Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                    <ColumnBox label="[one_third]">
                        <Dropcap>2Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                    <ColumnBox label="[one_third_last]">
                        <Dropcap>3Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                </div>
            </div>

            {/* 2/3 and 1/3 */}
            <div className="section-block space-y-6">
                <h4 className="text-[#ff00ff] uppercase tracking-widest font-bold text-sm border-l-2 border-[#ff00ff] pl-4">2/3 Columns Contents</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ColumnBox label="[two_third]" className="md:col-span-2">
                        <Dropcap>1Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dosectetur adipisicing elit, sed do.</Dropcap>
                    </ColumnBox>
                    <ColumnBox label="[one_third_last]">
                        <Dropcap>2Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua.</Dropcap>
                    </ColumnBox>
                </div>
            </div>

            {/* 1/3 and 2/3 (last) */}
            <div className="section-block space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ColumnBox label="[one_third]">
                        <Dropcap>1Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                    <ColumnBox label="[two_third_last]" className="md:col-span-2">
                        <Dropcap>2Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labolore magna aliqua. Ut enim ad minim veniam.</Dropcap>
                    </ColumnBox>
                </div>
            </div>

            {/* 4 Columns */}
            <div className="section-block space-y-6">
                <h4 className="text-[#ff00ff] uppercase tracking-widest font-bold text-sm border-l-2 border-[#ff00ff] pl-4">4 Columns Contents</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(idx => (
                        <ColumnBox key={idx} label={`[one_fourth${idx === 4 ? '_last' : ''}]`}>
                            <Dropcap>{idx}Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Dropcap>
                        </ColumnBox>
                    ))}
                </div>
            </div>

            <footer className="pt-16 border-t border-white/10 text-center italic text-white/30 text-xs">
                * All layout nodes verified for responsive breakpoint sync.
            </footer>
        </section>
    );
};

export default ColumnsShortcodeContent;
