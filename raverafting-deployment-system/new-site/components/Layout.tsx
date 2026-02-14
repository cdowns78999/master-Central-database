import React from 'react';

/**
 * LayoutProps
 * @param children - The main content of the page.
 * @param sidebar - The widgets to display in the right-hand sidebar.
 * @param title - Optional page title to be displayed in the browser tab or as an H1.
 */
interface LayoutProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    title?: string;
}

/**
 * Layout - High-Fidelity Master Shell (Production Version)
 * Optimized for Next.js with global CSS integration.
 */
const Layout: React.FC<LayoutProps> = ({ children, sidebar, title }) => {
    return (
        <div className="raverafting-shell font-lato">
            {/* 1. TOP BAR */}
            <div className="top-bar">
                <div className="container top-bar-inner">
                    <div className="must-read">
                        MUST READ <span>System Online // Production Intelligence Sync</span>
                    </div>
                    <div className="search-hint">
                        Search... <i className="fa fa-search"></i>
                    </div>
                </div>
            </div>

            {/* 2. MAIN HEADER (GREEN BANNER) */}
            <header className="main-header">
                <div className="container">
                    <a href="/">
                        <img
                            src="https://raverrafting.com/wp-content/uploads/raverrafting-logo-retina.png"
                            alt="RaverRafting"
                            className="max-w-[300px] mx-auto"
                        />
                    </a>
                </div>
            </header>

            {/* 3. MAIN NAVIGATION (BLACK BAR) */}
            <nav className="main-nav">
                <div className="container">
                    <ul className="nav-list flex justify-center list-none p-0 m-0">
                        {['News', 'Music', 'Events', 'About', 'Contact'].map((item) => (
                            <li key={item}>
                                <a
                                    href={`/${item.toLowerCase()}`}
                                    className="nav-link"
                                >
                                    {item} <i className="fa fa-caret-down ml-1 text-[0.7rem] opacity-50"></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* 4. CONTENT WRAPPER (MAIN + SIDEBAR) */}
            <div className="container my-8">
                <div className="content-grid flex flex-col md:flex-row">
                    {/* MAIN CONTENT */}
                    <main className="main-content flex-grow p-10">
                        {title && (
                            <h1 className="page-title">
                                {title}
                            </h1>
                        )}
                        {children}
                    </main>

                    {/* SIDEBAR */}
                    {sidebar && (
                        <aside className="sidebar w-full md:w-[380px] p-10">
                            <div className="sidebar-sticky sticky top-5 space-y-10">
                                {sidebar}
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* 5. INTERNAL PREVIEW FOOTER */}
            <footer className="site-footer-internal">
                <div className="container">
                    <p>RaverRafting Production Clone - Internal Preview Only</p>
                    <p className="batch-label">
                        Phase 01: <span style={{ color: 'var(--primary-green)' }}>Core Infrastructure Deployed</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
