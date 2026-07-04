import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import SEO from '../../components/SEO';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-6 text-center relative overflow-hidden font-sans selection:bg-accent selection:text-white">
            <SEO 
                title="System Alert | SK Enterprise"
                description="The requested industrial page or technical document could not be located."
                name="SK Enterprise"
                type="website"
                url="/error"
            />

            {/* Industrial background accent */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,180,216,0.1),transparent)] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Content Card */}
            <div className="relative z-10 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 max-w-lg w-full shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-500">
                {/* Alert Icon */}
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600 shadow-2xs">
                    <AlertTriangle className="w-8 h-8 animate-pulse text-red-500" />
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold tracking-widest uppercase shadow-2xs">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                    <span>SYSTEM EXCEPTION : {error?.status || '404'}</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-headline">
                    {error?.status === 404 ? 'Page Not Located' : 'System Interruption'}
                </h1>

                {/* Error Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {error?.status === 404
                        ? "The requested industrial valve specification, catalog page, or BOQ document could not be found in our database."
                        : error?.message || error?.statusText || 'An unexpected technical exception occurred while processing your request.'}
                </p>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-accent hover:from-blue-500 hover:to-accent text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        <span>Return to Homepage</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-2xs"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 text-xs font-mono text-slate-500">
                SK ENTERPRISE INDUSTRIAL VALVE PLATFORM • HOWRAH, WEST BENGAL
            </div>
        </div>
    );
};

export default ErrorPage;
