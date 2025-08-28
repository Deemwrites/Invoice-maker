
import React from 'react';
import type { Invoice } from '../types';

interface InvoicePreviewProps {
    invoice: Invoice;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
    const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const taxAmount = (subtotal * invoice.taxRate) / 100;
    const total = subtotal + taxAmount;

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString + 'T00:00:00').toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200 max-w-4xl mx-auto">
            {/* Header */}
            <header className="flex justify-between items-start pb-6 border-b-2 border-slate-100">
                <div>
                    {invoice.from.logo ? (
                        <img src={invoice.from.logo} alt="Company Logo" className="h-20 w-auto mb-4" />
                    ) : (
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">{invoice.from.name || 'Your Company'}</h1>
                    )}
                    <p className="text-slate-500 text-sm">{invoice.from.address || '123 Main St, City, State, ZIP'}</p>
                    <p className="text-slate-500 text-sm">{invoice.from.email || 'company@example.com'}</p>
                    <p className="text-slate-500 text-sm">{invoice.from.phone || '(123) 456-7890'}</p>
                    <p className="text-slate-500 text-sm mt-2"><span className="font-semibold">Date:</span> {formatDate(invoice.date)}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-bold text-slate-400 uppercase tracking-wider">Invoice</h2>
                    <p className="text-slate-600 mt-2"># {invoice.invoiceNumber || 'INV-001'}</p>
                </div>
            </header>

            {/* Bill To */}
            <section className="mt-8">
                <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase">Bill To</h3>
                    <p className="font-bold text-slate-800 mt-1">{invoice.to.name || 'Client Name'}</p>
                    <p className="text-slate-500 text-sm">{invoice.to.address || '456 Client Ave, City, State, ZIP'}</p>
                    <p className="text-slate-500 text-sm">{invoice.to.phone || '(987) 654-3210'}</p>
                </div>
            </section>

            {/* Line Items Table */}
            <section className="mt-10">
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-slate-600 uppercase">Description</th>
                            <th className="p-3 text-sm font-semibold text-slate-600 uppercase text-center">Qty</th>
                            <th className="p-3 text-sm font-semibold text-slate-600 uppercase text-right">Rate</th>
                            <th className="p-3 text-sm font-semibold text-slate-600 uppercase text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item) => (
                            <tr key={item.id} className="border-b border-slate-100">
                                <td className="p-3 font-medium text-slate-800">{item.description || 'Service Description'}</td>
                                <td className="p-3 text-slate-600 text-center">{item.quantity}</td>
                                <td className="p-3 text-slate-600 text-right">₦{item.rate.toFixed(2)}</td>
                                <td className="p-3 text-slate-800 font-medium text-right">₦{(item.quantity * item.rate).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Totals */}
            <section className="flex justify-end mt-8">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-slate-600 mb-2">
                        <span>Subtotal</span>
                        <span>₦{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 mb-2">
                        <span>Tax ({invoice.taxRate}%)</span>
                        <span>₦{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 text-lg border-t border-slate-200 pt-2 mt-2">
                        <span>Total Due</span>
                        <span>₦{total.toFixed(2)}</span>
                    </div>
                </div>
            </section>

            {/* Notes */}
            {invoice.notes && (
                <section className="mt-10 pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Notes</h3>
                    <p className="text-slate-600 text-sm whitespace-pre-wrap">{invoice.notes}</p>
                </section>
            )}
        </div>
    );
};

export default InvoicePreview;
