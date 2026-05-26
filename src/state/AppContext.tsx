import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { monthKey } from '../utils';


export type Tx = { id: string; type: 'income'|'expense'; amount: number; category?: string; note?: string; date: string; month: string; recurringId?: string };
export type Recurring = { id: string; name: string; type: 'income'|'expense'; amount: number; cadence: 'weekly'|'monthly'|'yearly'; nextDate: string; category?: string };
export type Goal = { id: string; name: string; target: number; saved: number; note?: string };


const STORE_KEY = 'economia:v1';


type Ctx = {
transactions: Tx[]; setTransactions: React.Dispatch<React.SetStateAction<Tx[]>>;
recurrings: Recurring[]; setRecurrings: React.Dispatch<React.SetStateAction<Recurring[]>>;
goals: Goal[]; setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
currency: string; setCurrency: (c: string) => void;
currentMonth: string; income: number; expense: number; balance: number;
};


const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => {
const ctx = useContext(AppCtx);
if (!ctx) throw new Error('useApp must be used within AppProvider');
return ctx;
};


export function AppProvider({ children }: { children: React.ReactNode }) {
const [transactions, setTransactions] = useState<Tx[]>([]);
const [recurrings, setRecurrings] = useState<Recurring[]>([]);
const [goals, setGoals] = useState<Goal[]>([]);
const [currency, setCurrency] = useState('USD');


useEffect(() => { (async () => {
const raw = await AsyncStorage.getItem(STORE_KEY);
if (!raw) return;
try {
const data = JSON.parse(raw);
setTransactions(data.transactions || []);
setRecurrings(data.recurrings || []);
setGoals(data.goals || []);
setCurrency(data.currency || 'USD');
} catch {}
})(); }, []);


useEffect(() => {
AsyncStorage.setItem(STORE_KEY, JSON.stringify({ transactions, recurrings, goals, currency }));
}, [transactions, recurrings, goals, currency]);


const currentMonth = monthKey();
const monthTx = useMemo(() => transactions.filter(t => t.month === currentMonth), [transactions]);
const income = useMemo(() => monthTx.filter(t => t.type==='income').reduce((a,b)=>a+Number(b.amount||0),0), [monthTx]);
const expense = useMemo(() => monthTx.filter(t => t.type==='expense').reduce((a,b)=>a+Number(b.amount||0),0), [monthTx]);
const balance = useMemo(() => income - expense, [income, expense]);


return (
<AppCtx.Provider value={{ transactions, setTransactions, recurrings, setRecurrings, goals, setGoals, currency, setCurrency, currentMonth, income, expense, balance }}>
{children}
</AppCtx.Provider>
);
}