
import { useState, useCallback } from 'react';
import type { Invoice, LineItem } from '../types';

const getInitialInvoice = (): Invoice => {
    const today = new Date();

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {
        from: { name: '', address: '', email: '', phone: '' },
        to: { name: '', address: '', phone: '' },
        invoiceNumber: 'INV-001',
        date: formatDate(today),
        items: [
            { id: crypto.randomUUID(), description: 'Website Design', quantity: 1, rate: 1500 },
        ],
        notes: 'Thank you for your business. Please pay within 30 days.',
        taxRate: 5,
    };
};

export const useInvoice = () => {
    const [invoice, setInvoice] = useState<Invoice>(getInitialInvoice());

    const updateInvoice = useCallback(<K extends keyof Invoice>(key: K, value: Invoice[K]) => {
        setInvoice(prev => ({ ...prev, [key]: value }));
    }, []);

    const addLineItem = useCallback(() => {
        setInvoice(prev => ({
            ...prev,
            items: [...prev.items, { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }],
        }));
    }, []);

    const removeLineItem = useCallback((id: string) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id),
        }));
    }, []);

    const updateLineItem = useCallback((id: string, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    }, []);

    const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const logoUrl = e.target?.result as string;
                setInvoice(prev => ({ ...prev, from: { ...prev.from, logo: logoUrl } }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const resetInvoice = useCallback(() => {
        setInvoice(getInitialInvoice());
    }, []);

    return { invoice, updateInvoice, addLineItem, removeLineItem, updateLineItem, resetInvoice, handleLogoUpload };
};
