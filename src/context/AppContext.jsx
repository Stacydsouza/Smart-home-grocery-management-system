import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext(null);

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [items, setItems] = useState([]);
    const [stock, setStock] = useState([]);
    const [locations, setLocations] = useState([]);
    const [logs, setLogs] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [shopItems, setShopItems] = useState([]);
    const [persons, setPersons] = useState([]);

    // --- Data Fetching ---
    const fetchData = useCallback(async () => {
        const { data: dItems } = await supabase.from('items').select('*');
        const { data: dStock } = await supabase.from('item_stock').select('*');
        const { data: dLocs } = await supabase.from('storage_location').select('*');
        const { data: dLogs } = await supabase.from('usage_log').select('*');
        const { data: dRecipes } = await supabase.from('recipes').select('*');
        const { data: dShop } = await supabase.from('shopping_list').select('*');
        const { data: dPersons } = await supabase.from('person').select('*');

        if (dItems) setItems(dItems.map(i => ({
            ID: i.id, Name: i.name, Brand: i.brand, Category: i.category, Alt_Brand: i.alt_brand, Min_Qty: i.min_threshold
        })));

        if (dStock) setStock(dStock.map(s => {
            const today = new Date();
            const expiry = new Date(s.expiry_date);
            const diffTime = expiry - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return {
                ID: s.id, Item_ID: s.item_id, Storage_ID: s.storage_id,
                Stock_Qty: s.stock_qty, Expiry_Date: s.expiry_date, Days_Left: diffDays
            }

        }));

        if (dLocs) setLocations(dLocs.map(l => ({
            ID: l.id, Location_Name: l.location_name, Temperature: l.temp,
            Height: l.height, Width: l.width, Depth: l.depth
        })));

        if (dLogs) setLogs(dLogs.map(l => ({
            Log_ID: l.log_id, Item_ID: l.item_id, Person_ID: l.person_id,
            Used_Date: l.used_date, Used_Quantity: l.used_qty
        })));

        if (dRecipes) setRecipes(dRecipes.map(r => ({
            ID: r.id, Name: r.name, Difficulty: r.difficulty, Prep_Time: r.prep_time,
            Ingredients: r.ingredients || []
        })));

        if (dShop) setShopItems(dShop.map(s => ({
            ID: s.id, Item_ID: s.item_id, Status: s.status, Added_Date: s.added_date
        })));

        if (dPersons) setPersons(dPersons.map(p => ({
            Person_ID: p.id, First_Name: p.first_name, Last_Name: p.last_name,
            Location: p.location, Age: p.age, Phone_No: p.phone_no
        })));
    }, []);

    useEffect(() => {
        fetchData();
        const channel = supabase.channel('public:all')
            .on('postgres_changes', { event: '*', schema: 'public' }, () => {
                fetchData();
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [fetchData]);

    // --- Computed ---
    const expiringItems = stock.filter(s => s.Days_Left <= 3);
    const expiredItems = stock.filter(s => s.Days_Left <= 0);

    // --- Helpers ---
    const getItem = useCallback((id) => items.find(i => i.ID === id), [items]);
    const getLocation = useCallback((id) => locations.find(l => l.ID === id), [locations]);
    const getPerson = useCallback((id) => persons.find(p => p.Person_ID === id), [persons]);

    const checkRecipeStock = useCallback((recipeId) => {
        const recipe = recipes.find(r => r.ID === recipeId);
        if (!recipe) return [];
        return recipe.Ingredients.map(ing => {
            const item = getItem(ing.item_id);
            const totalStock = stock
                .filter(s => s.Item_ID === ing.item_id)
                .reduce((sum, s) => sum + s.Stock_Qty, 0);
            return {
                itemId: ing.item_id,
                item,
                required: ing.qty,
                currentQty: totalStock,
                inStock: totalStock >= ing.qty
            };
        });
    }, [recipes, stock, getItem]);

    // --- CRUD ---
    const addItem = async (item) => {
        const { error } = await supabase.from('items').insert([{
            name: item.Name, brand: item.Brand, category: item.Category, alt_brand: item.Alt_Brand
        }]);
        if (error) toast.error('Failed to add item');
        else toast.success('Item added');
    };

    const deleteItem = async (id) => {
        await supabase.from('items').delete().eq('id', id);
        toast.success('Item deleted');
    };

    const addStock = async (entry) => {
        const { error } = await supabase.from('item_stock').insert([{
            item_id: entry.Item_ID, storage_id: entry.Storage_ID,
            current_qty: entry.Stock_Qty, expiry_date: entry.Expiry_Date,
            days_left: entry.Days_Left
        }]);
        if (error) toast.error('Failed to add stock');
        else toast.success('Stock updated');
    };

    const deleteStock = async (id) => {
        await supabase.from('item_stock').delete().eq('id', id);
        toast.success('Stock removed');
    };

    const addLog = async (log) => {
        const { error } = await supabase.from('usage_log').insert([{
            item_id: log.Item_ID, person_id: log.Person_ID, used_qty: log.Used_Quantity
        }]);
        if (error) toast.error('Failed to log usage');
        else toast.success('Usage logged');
    };

    const addShoppingItem = async (itemId) => {
        const { error } = await supabase.from('shopping_list').insert([{ item_id: itemId }]);
        if (error) toast.error('Failed to add to list');
        else toast.success('Added to list');
    };

    const toggleShoppingItem = async (id, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'purchased' : 'pending';
        await supabase.from('shopping_list').update({ status: newStatus }).eq('id', id);
    };

    const removeShoppingItem = async (id) => {
        await supabase.from('shopping_list').delete().eq('id', id);
        toast.success('Item removed');
    };

    const addMissingIngredientsToList = async (recipeId) => {
        const status = checkRecipeStock(recipeId);
        const missing = status.filter(s => !s.inStock);
        let addedCount = 0;

        for (const m of missing) {
            // Check if already in pending list
            const exists = shopItems.find(si => si.Item_ID === m.itemId && si.Status === 'pending');
            if (!exists) {
                await addShoppingItem(m.itemId);
                addedCount++;
            }
        }
        if (addedCount > 0) toast.success(`Added ${addedCount} items to shopping list`);
        else toast('All ingredients in stock!', { icon: '👏' });
    };

    const addPerson = async (p) => {
        const { error } = await supabase.from('person').insert([{
            first_name: p.First_Name, last_name: p.Last_Name,
            location: p.Location, age: p.Age, phone_no: p.Phone_No
        }]);
        if (error) toast.error('Failed');
        else toast.success('Member added');
    };

    const deletePerson = async (id) => {
        await supabase.from('person').delete().eq('id', id);
        toast.success('Member removed');
    };

    const addRecipe = async (r) => {
        const { error } = await supabase.from('recipes').insert([{
            name: r.Recipe_Name, difficulty: r.Difficulty, prep_time: r.Prep_Time,
            ingredients: r.Ingredients
        }]);
        if (error) toast.error('Failed');
        else toast.success('Recipe added');
    };

    const deleteRecipe = async (id) => {
        await supabase.from('recipes').delete().eq('id', id);
        toast.success('Recipe deleted');
    };

    const value = {
        items, stock, locations, logs, recipes, persons, shopItems,
        expiringItems, expiredItems,
        getItem, getLocation, getPerson, checkRecipeStock,
        addItem, deleteItem, addStock, deleteStock, addLog,
        addShoppingItem, toggleShoppingItem, removeShoppingItem, addMissingIngredientsToList,
        addPerson, deletePerson, addRecipe, deleteRecipe
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
