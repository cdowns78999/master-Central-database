import React from 'react';

interface TwoColumnPageLayoutProps {
    showHeader?: boolean;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

/**
 * TwoColumnPageLayout - Standard WordPress-style layout shell
 * Features a main content area, a right sidebar, and an optional header.
 */
const TwoColumnPageLayout: React.FC<TwoColumnPageLayoutProps> = ({
    showHeader = false,
    title = "",
    subtitle = "",
    children,
    sidebar
}) => {
    return (
        <div className="page-layout two-column-wrapper min-h-screen bg-[#0a0a0c] text-white">
            {showHeader && (
                <header className="page-header w-full py-12 px-6 border-b border-white/10 text-center">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#00ffcc] mb-4">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-[#a0a0a0] uppercase tracking-[6px] text-xs md:text-sm opacity-80">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </header>
            )}

            <div className="layout-body max-w-7xl mx-auto flex flex-col md:flex-row gap-12 py-16 px-6">
                <main className="main-content-area flex-1 order-1 md:order-none">
                    {children}
                </main>

                <aside className="sidebar-area w-full md:w-[320px] lg:w-[380px] shrink-0">
                    <div className="sidebar-content sticky top-8 space-y-12">
                        {sidebar}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TwoColumnPageLayout;
