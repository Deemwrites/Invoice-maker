
import React, { useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { useInvoice } from './hooks/useInvoice';
import { Download, RotateCcw } from 'lucide-react';

declare global {
    interface Window {
        html2canvas: any;
        jspdf: any;
    }
}

const App: React.FC = () => {
    const { invoice, updateInvoice, addLineItem, removeLineItem, updateLineItem, resetInvoice, handleLogoUpload } = useInvoice();
    const invoicePreviewRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = async () => {
        const element = invoicePreviewRef.current;
        if (!element) return;

        const { jsPDF } = window.jspdf;
        const canvas = await window.html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        const fileName = `Invoice-${invoice.invoiceNumber || 'untitled'}.pdf`;
        pdf.save(fileName);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-slate-900">Instant Invoice Generator</h1>
                    <p className="text-lg text-slate-600 mt-2">Create professional invoices in seconds. No sign-up required.</p>
                </div>

                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
                     <button
                        onClick={handleDownloadPdf}
                        className="bg-slate-700 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400 transition-transform transform hover:scale-105"
                        aria-label="Download PDF"
                    >
                        <Download className="h-6 w-6" />
                    </button>
                    <button
                        onClick={resetInvoice}
                        className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
                        aria-label="Reset Form"
                    >
                        <RotateCcw className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                        <InvoiceForm 
                            invoice={invoice} 
                            updateInvoice={updateInvoice} 
                            addLineItem={addLineItem} 
                            removeLineItem={removeLineItem} 
                            updateLineItem={updateLineItem}
                            handleLogoUpload={handleLogoUpload}
                        />
                    </div>
                    <div className="mt-8 lg:mt-0 sticky top-8 self-start">
                        <div ref={invoicePreviewRef}>
                          <InvoicePreview invoice={invoice} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
