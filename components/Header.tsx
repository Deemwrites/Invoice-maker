
import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-8 w-8 text-slate-700" />
                    <span className="text-2xl font-bold text-slate-800">InvoiceGen</span>
                </div>
                <a 
                    href="https://github.com/your-repo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-600 hover:text-slate-800 transition-colors"
                >
                    GitHub
                </a>
            </div>
        </header>
    );
};

export default Header;
