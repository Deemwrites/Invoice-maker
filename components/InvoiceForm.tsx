
import React from 'react';
import type { Invoice, LineItem } from '../types';
import { PlusCircle, Trash2, UploadCloud } from 'lucide-react';

interface InvoiceFormProps {
    invoice: Invoice;
    updateInvoice: <K extends keyof Invoice>(key: K, value: Invoice[K]) => void;
    addLineItem: () => void;
    removeLineItem: (id: string) => void;
    updateLineItem: (id: string, field: keyof Omit<LineItem, 'id'>, value: string | number) => void;
    handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input id={id} {...props} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
    </div>
);

const TextAreaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, ...props }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea id={id} {...props} rows={3} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
    </div>
);

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, updateInvoice, addLineItem, removeLineItem, updateLineItem, handleLogoUpload }) => {
    
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInvoice('from', { ...invoice.from, [e.target.name]: e.target.value });
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInvoice('to', { ...invoice.to, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <FormSection title="From">
                <div className="sm:col-span-2">
                     <label htmlFor="company-logo-upload" className="block text-sm font-medium text-slate-700 mb-1">Company Logo</label>
                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {invoice.from.logo ? (
                                <img src={invoice.from.logo} alt="Company Logo" className="mx-auto h-24 w-auto" />
                            ) : (
                                <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                            )}
                            <div className="flex text-sm text-slate-600">
                                <label htmlFor="company-logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-slate-700 hover:text-slate-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-500">
                                    <span>Upload a file</span>
                                    <input id="company-logo-upload" name="company-logo-upload" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <InputField label="Company Name" name="name" value={invoice.from.name} onChange={handleFromChange} placeholder="Your Company LLC"/>
                <InputField label="Email" name="email" type="email" value={invoice.from.email} onChange={handleFromChange} placeholder="contact@yourcompany.com"/>
                <InputField label="Phone" name="phone" type="tel" value={invoice.from.phone} onChange={handleFromChange} placeholder="(123) 456-7890"/>
                <div className="sm:col-span-2">
                  <InputField label="Address" name="address" value={invoice.from.address} onChange={handleFromChange} placeholder="123 Main St, Anytown, USA"/>
                </div>
            </FormSection>

            <FormSection title="To">
                <InputField label="Client Name" name="name" value={invoice.to.name} onChange={handleToChange} placeholder="Client Inc." />
                <InputField label="Client Phone" name="phone" type="tel" value={invoice.to.phone} onChange={handleToChange} placeholder="(987) 654-3210"/>
                <div className="sm:col-span-2">
                    <InputField label="Client Address" name="address" value={invoice.to.address} onChange={handleToChange} placeholder="456 Client Ave, Otherville, USA"/>
                </div>
            </FormSection>

            <FormSection title="Details">
                <InputField label="Invoice Number" value={invoice.invoiceNumber} onChange={(e) => updateInvoice('invoiceNumber', e.target.value)} placeholder="INV-001" />
                <InputField label="Tax Rate (%)" type="number" value={invoice.taxRate} onChange={(e) => updateInvoice('taxRate', parseFloat(e.target.value))} placeholder="5" />
                 <div className="sm:col-span-2">
                    <InputField label="Invoice Date" type="date" value={invoice.date} onChange={(e) => updateInvoice('date', e.target.value)} />
                </div>
            </FormSection>

            <div>
                <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">Line Items</h2>
                <div className="space-y-4">
                    {invoice.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 p-3 bg-slate-50 rounded-lg items-center">
                            <div className="col-span-12 sm:col-span-5">
                                <InputField label={`Item ${index+1}`} placeholder="Item description" value={item.description} onChange={(e) => updateLineItem(item.id, 'description', e.target.value)} />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
                                <InputField label="Qty" type="number" placeholder="1" value={item.quantity} onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)} />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <InputField label="Rate" type="number" placeholder="100.00" value={item.rate} onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)} />
                            </div>
                            <div className="col-span-12 sm:col-span-2 flex items-end justify-between">
                                <div className="text-sm text-slate-700 mt-7 sm:mt-0">
                                   <span className="font-medium">Total:</span> ₦{(item.quantity * item.rate).toFixed(2)}
                                </div>
                                <button onClick={() => removeLineItem(item.id)} className="text-red-500 hover:text-red-700 p-2 mt-5">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={addLineItem} className="mt-4 flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium">
                    <PlusCircle size={20} /> Add Item
                </button>
            </div>
            
            <div className="mt-8">
                <TextAreaField label="Notes / Terms" value={invoice.notes} onChange={(e) => updateInvoice('notes', e.target.value)} placeholder="Payment terms, thank you note, etc." />
            </div>
        </form>
    );
};

export default InvoiceForm;
