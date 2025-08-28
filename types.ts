
export interface Company {
    name: string;
    address: string;
    email: string;
    phone: string;
    logo?: string;
}

export interface Client {
    name: string;
    address: string;
    phone: string;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

export interface Invoice {
    from: Company;
    to: Client;
    invoiceNumber: string;
    date: string;
    items: LineItem[];
    notes: string;
    taxRate: number;
}
