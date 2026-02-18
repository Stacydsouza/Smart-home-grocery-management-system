// ============================================================
// Mock Relational Database — Seed Data
// ============================================================

// --- Persons ---
export const persons = [
    { Person_ID: 1, First_Name: 'Ravi', Last_Name: 'Kumar', Location: 'Chennai', Age: 32, Phone_No: '9876543210' },
    { Person_ID: 2, First_Name: 'Priya', Last_Name: 'Sharma', Location: 'Chennai', Age: 28, Phone_No: '9876543211' },
    { Person_ID: 3, First_Name: 'Arjun', Last_Name: 'Patel', Location: 'Chennai', Age: 10, Phone_No: '9876543212' },
    { Person_ID: 4, First_Name: 'Meera', Last_Name: 'Nair', Location: 'Chennai', Age: 55, Phone_No: '9876543213' },
];

// --- Storage Locations ---
export const storageLocations = [
    { ID: 1, Location_Name: 'Main Fridge', Temperature: 4, Height: 180, Width: 70, Depth: 65 },
    { ID: 2, Location_Name: 'Freezer', Temperature: -18, Height: 80, Width: 70, Depth: 65 },
    { ID: 3, Location_Name: 'Pantry', Temperature: 22, Height: 200, Width: 100, Depth: 50 },
    { ID: 4, Location_Name: 'Spice Rack', Temperature: 22, Height: 40, Width: 60, Depth: 15 },
    { ID: 5, Location_Name: 'Fruit Basket', Temperature: 22, Height: 30, Width: 40, Depth: 40 },
];

// --- Items ---
export const items = [
    { ID: 1, Name: 'Whole Milk', Brand: 'Amul', Category: 'Dairy', Alt_Brand: 'Nandini' },
    { ID: 2, Name: 'Eggs', Brand: 'Farm Fresh', Category: 'Dairy', Alt_Brand: 'Country Delight' },
    { ID: 3, Name: 'Chicken Breast', Brand: 'Licious', Category: 'Meat', Alt_Brand: 'FreshToHome' },
    { ID: 4, Name: 'Basmati Rice', Brand: 'India Gate', Category: 'Grains', Alt_Brand: 'Daawat' },
    { ID: 5, Name: 'Olive Oil', Brand: 'Figaro', Category: 'Oils', Alt_Brand: 'Borges' },
    { ID: 6, Name: 'Tomatoes', Brand: 'Local Farm', Category: 'Vegetables', Alt_Brand: '' },
    { ID: 7, Name: 'Onions', Brand: 'Local Farm', Category: 'Vegetables', Alt_Brand: '' },
    { ID: 8, Name: 'Garlic', Brand: 'Local Farm', Category: 'Vegetables', Alt_Brand: '' },
    { ID: 9, Name: 'Curd', Brand: 'Amul', Category: 'Dairy', Alt_Brand: 'Nandini' },
    { ID: 10, Name: 'Butter', Brand: 'Amul', Category: 'Dairy', Alt_Brand: 'Britannia' },
    { ID: 11, Name: 'Green Chillies', Brand: 'Local Farm', Category: 'Vegetables', Alt_Brand: '' },
    { ID: 12, Name: 'Turmeric Powder', Brand: 'MDH', Category: 'Spices', Alt_Brand: 'Everest' },
    { ID: 13, Name: 'Cumin Powder', Brand: 'MDH', Category: 'Spices', Alt_Brand: 'Catch' },
    { ID: 14, Name: 'Bread', Brand: 'Britannia', Category: 'Bakery', Alt_Brand: 'Modern' },
    { ID: 15, Name: 'Apples', Brand: 'Shimla', Category: 'Fruits', Alt_Brand: '' },
    { ID: 16, Name: 'Bananas', Brand: 'Local Farm', Category: 'Fruits', Alt_Brand: '' },
    { ID: 17, Name: 'Frozen Peas', Brand: 'Safal', Category: 'Frozen', Alt_Brand: 'McCain' },
    { ID: 18, Name: 'Paneer', Brand: 'Amul', Category: 'Dairy', Alt_Brand: 'Mother Dairy' },
    { ID: 19, Name: 'Ginger', Brand: 'Local Farm', Category: 'Vegetables', Alt_Brand: '' },
    { ID: 20, Name: 'Coriander Leaves', Brand: 'Local Farm', Category: 'Vegetables', Alt_Brand: '' },
];

// --- Item Stock ---
const today = new Date();
const d = (offset) => {
    const dt = new Date(today);
    dt.setDate(dt.getDate() + offset);
    return dt.toISOString().split('T')[0];
};
const todayStr = d(0);

export const itemStock = [
    { ID: 1, Item_ID: 1, Storage_ID: 1, Stock_Qty: 2, Days_Left: 3, Expiry_Date: d(3), Current_Date: todayStr },
    { ID: 2, Item_ID: 2, Storage_ID: 1, Stock_Qty: 12, Days_Left: 10, Expiry_Date: d(10), Current_Date: todayStr },
    { ID: 3, Item_ID: 3, Storage_ID: 2, Stock_Qty: 4, Days_Left: 14, Expiry_Date: d(14), Current_Date: todayStr },
    { ID: 4, Item_ID: 4, Storage_ID: 3, Stock_Qty: 5, Days_Left: 180, Expiry_Date: d(180), Current_Date: todayStr },
    { ID: 5, Item_ID: 5, Storage_ID: 3, Stock_Qty: 1, Days_Left: 365, Expiry_Date: d(365), Current_Date: todayStr },
    { ID: 6, Item_ID: 6, Storage_ID: 1, Stock_Qty: 6, Days_Left: 5, Expiry_Date: d(5), Current_Date: todayStr },
    { ID: 7, Item_ID: 7, Storage_ID: 3, Stock_Qty: 10, Days_Left: 15, Expiry_Date: d(15), Current_Date: todayStr },
    { ID: 8, Item_ID: 8, Storage_ID: 4, Stock_Qty: 3, Days_Left: 20, Expiry_Date: d(20), Current_Date: todayStr },
    { ID: 9, Item_ID: 9, Storage_ID: 1, Stock_Qty: 2, Days_Left: 2, Expiry_Date: d(2), Current_Date: todayStr },
    { ID: 10, Item_ID: 10, Storage_ID: 1, Stock_Qty: 1, Days_Left: 30, Expiry_Date: d(30), Current_Date: todayStr },
    { ID: 11, Item_ID: 11, Storage_ID: 1, Stock_Qty: 5, Days_Left: 4, Expiry_Date: d(4), Current_Date: todayStr },
    { ID: 12, Item_ID: 12, Storage_ID: 4, Stock_Qty: 1, Days_Left: 200, Expiry_Date: d(200), Current_Date: todayStr },
    { ID: 13, Item_ID: 13, Storage_ID: 4, Stock_Qty: 1, Days_Left: 200, Expiry_Date: d(200), Current_Date: todayStr },
    { ID: 14, Item_ID: 14, Storage_ID: 3, Stock_Qty: 1, Days_Left: 1, Expiry_Date: d(1), Current_Date: todayStr },
    { ID: 15, Item_ID: 15, Storage_ID: 5, Stock_Qty: 6, Days_Left: 7, Expiry_Date: d(7), Current_Date: todayStr },
    { ID: 16, Item_ID: 16, Storage_ID: 5, Stock_Qty: 8, Days_Left: 3, Expiry_Date: d(3), Current_Date: todayStr },
    { ID: 17, Item_ID: 17, Storage_ID: 2, Stock_Qty: 3, Days_Left: 90, Expiry_Date: d(90), Current_Date: todayStr },
    { ID: 18, Item_ID: 18, Storage_ID: 1, Stock_Qty: 2, Days_Left: 5, Expiry_Date: d(5), Current_Date: todayStr },
    { ID: 19, Item_ID: 19, Storage_ID: 1, Stock_Qty: 2, Days_Left: 8, Expiry_Date: d(8), Current_Date: todayStr },
    { ID: 20, Item_ID: 20, Storage_ID: 1, Stock_Qty: 1, Days_Left: 2, Expiry_Date: d(2), Current_Date: todayStr },
];

// --- Recipes ---
export const recipes = [
    { Recipe_ID: 1, Recipe_Name: 'Paneer Butter Masala', Difficulty: 'Medium', Prep_Time: 40 },
    { Recipe_ID: 2, Recipe_Name: 'Egg Fried Rice', Difficulty: 'Easy', Prep_Time: 20 },
    { Recipe_ID: 3, Recipe_Name: 'Chicken Curry', Difficulty: 'Medium', Prep_Time: 50 },
    { Recipe_ID: 4, Recipe_Name: 'Dal Tadka', Difficulty: 'Easy', Prep_Time: 30 },
    { Recipe_ID: 5, Recipe_Name: 'Fruit Salad', Difficulty: 'Easy', Prep_Time: 10 },
    { Recipe_ID: 6, Recipe_Name: 'Tomato Soup', Difficulty: 'Easy', Prep_Time: 25 },
];

// --- Recipe Ingredients (linked to Items) ---
export const recipeIngredients = [
    // Paneer Butter Masala
    { Recipe_ID: 1, Item_ID: 18, Quantity: 1 },  // Paneer
    { Recipe_ID: 1, Item_ID: 10, Quantity: 1 },  // Butter
    { Recipe_ID: 1, Item_ID: 6, Quantity: 3 },  // Tomatoes
    { Recipe_ID: 1, Item_ID: 7, Quantity: 1 },  // Onions
    { Recipe_ID: 1, Item_ID: 8, Quantity: 1 },  // Garlic
    { Recipe_ID: 1, Item_ID: 12, Quantity: 1 },  // Turmeric
    { Recipe_ID: 1, Item_ID: 9, Quantity: 1 },  // Curd
    // Egg Fried Rice
    { Recipe_ID: 2, Item_ID: 2, Quantity: 4 },  // Eggs
    { Recipe_ID: 2, Item_ID: 4, Quantity: 2 },  // Rice
    { Recipe_ID: 2, Item_ID: 7, Quantity: 1 },  // Onions
    { Recipe_ID: 2, Item_ID: 11, Quantity: 2 },  // Green Chillies
    { Recipe_ID: 2, Item_ID: 5, Quantity: 1 },  // Olive Oil
    // Chicken Curry
    { Recipe_ID: 3, Item_ID: 3, Quantity: 2 },  // Chicken
    { Recipe_ID: 3, Item_ID: 6, Quantity: 3 },  // Tomatoes
    { Recipe_ID: 3, Item_ID: 7, Quantity: 2 },  // Onions
    { Recipe_ID: 3, Item_ID: 8, Quantity: 1 },  // Garlic
    { Recipe_ID: 3, Item_ID: 19, Quantity: 1 },  // Ginger
    { Recipe_ID: 3, Item_ID: 12, Quantity: 1 },  // Turmeric
    { Recipe_ID: 3, Item_ID: 13, Quantity: 1 },  // Cumin
    // Dal Tadka
    { Recipe_ID: 4, Item_ID: 8, Quantity: 1 },  // Garlic
    { Recipe_ID: 4, Item_ID: 12, Quantity: 1 },  // Turmeric
    { Recipe_ID: 4, Item_ID: 13, Quantity: 1 },  // Cumin
    { Recipe_ID: 4, Item_ID: 10, Quantity: 1 },  // Butter
    { Recipe_ID: 4, Item_ID: 11, Quantity: 2 },  // Green Chillies
    { Recipe_ID: 4, Item_ID: 20, Quantity: 1 },  // Coriander
    // Fruit Salad
    { Recipe_ID: 5, Item_ID: 15, Quantity: 2 },  // Apples
    { Recipe_ID: 5, Item_ID: 16, Quantity: 2 },  // Bananas
    // Tomato Soup
    { Recipe_ID: 6, Item_ID: 6, Quantity: 5 },  // Tomatoes
    { Recipe_ID: 6, Item_ID: 10, Quantity: 1 },  // Butter
    { Recipe_ID: 6, Item_ID: 8, Quantity: 1 },  // Garlic
    { Recipe_ID: 6, Item_ID: 20, Quantity: 1 },  // Coriander
];

// --- Shopping Lists ---
export const shoppingLists = [
    { List_ID: 1, Status: 'Active', Created_Date: d(-2) },
    { List_ID: 2, Status: 'Completed', Created_Date: d(-10) },
];

export const shoppingListItems = [
    { List_ID: 1, Item_ID: 1, Required_Quantity: 3, Purchased: false },
    { List_ID: 1, Item_ID: 14, Required_Quantity: 2, Purchased: false },
    { List_ID: 1, Item_ID: 9, Required_Quantity: 2, Purchased: true },
    { List_ID: 1, Item_ID: 3, Required_Quantity: 2, Purchased: false },
    { List_ID: 2, Item_ID: 4, Required_Quantity: 5, Purchased: true },
    { List_ID: 2, Item_ID: 5, Required_Quantity: 1, Purchased: true },
];

// --- Usage Logs ---
export const usageLogs = [
    { Log_ID: 1, Item_ID: 1, Person_ID: 1, Used_Date: d(-1), Used_Quantity: 1 },
    { Log_ID: 2, Item_ID: 2, Person_ID: 2, Used_Date: d(-1), Used_Quantity: 2 },
    { Log_ID: 3, Item_ID: 14, Person_ID: 3, Used_Date: d(0), Used_Quantity: 1 },
    { Log_ID: 4, Item_ID: 6, Person_ID: 1, Used_Date: d(0), Used_Quantity: 2 },
    { Log_ID: 5, Item_ID: 9, Person_ID: 4, Used_Date: d(-2), Used_Quantity: 1 },
    { Log_ID: 6, Item_ID: 18, Person_ID: 2, Used_Date: d(-1), Used_Quantity: 1 },
    { Log_ID: 7, Item_ID: 4, Person_ID: 1, Used_Date: d(-3), Used_Quantity: 1 },
    { Log_ID: 8, Item_ID: 10, Person_ID: 4, Used_Date: d(0), Used_Quantity: 1 },
];
