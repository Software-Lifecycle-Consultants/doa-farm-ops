export const machineryCostData = [
  {
    _id: "s323a4sd667sk89054",
    method: "method 1",
    ownedOrHired: "Owned",
    noOfTimes: 12,
    days: 7,
    cost: "2000",
  },
  {
    _id: "sdf76asdg234gjk789",
    method: "method 2",
    ownedOrHired: "Hired",
    noOfTimes: 5,
    days: 4,
    cost: "1500",
  },
  {
    _id: "fgh45hj67k23klm098",
    method: "method 3",
    ownedOrHired: "Owned",
    noOfTimes: 8,
    days: 6,
    cost: "2800",
  },
  {
    _id: "pqr12xyz56abc78901",
    method: "method 4",
    ownedOrHired: "Hired",
    noOfTimes: 10,
    days: 5,
    cost: "1900",
  },
];


export const laborCostData = [
  {
    _id: "l1as34sd67sk89054",
    gender: "Male",
    freeOrHired: "Hired",
    quantity: 5,
    dailyWage: 100,
    foodCostPerDay: 20,
  },
  {
    _id: "l2df76asdg23gjk789",
    gender: "Female",
    freeOrHired: "Hired",
    quantity: 3,
    dailyWage: 90,
    foodCostPerDay: 15,
  },
  {
    _id: "l3fgh45hj67k2klm098",
    gender: "Male",
    freeOrHired: "Free",
    quantity: 8,
    dailyWage: 0, // Daily wage is 0 for free labor
    foodCostPerDay: 25,
  },
  {
    _id: "l4pqr12xyz56a7bc8901",
    gender: "Male",
    freeOrHired: "Hired",
    quantity: 6,
    dailyWage: 110,
    foodCostPerDay: 18,
  },
];


export const materialCostData = [
  {
    _id: "m1as34sd67sk89054",
    material: "Material 1",
    quantity: 100,
    costOfMaterial: 5000,
  },
  {
    _id: "m2df76asdg23gjk789",
    material: "Material 2",
    quantity: 50,
    costOfMaterial: 3500,
  },
  {
    _id: "m3fgh45hj67k2klm098",
    material: "Material 3",
    quantity: 200,
    costOfMaterial: 8000,
  },
  {
    _id: "m4pqr12xyz56a7bc8901",
    material: "Material 3",
    quantity: 5000,
    costOfMaterial: 2500,
  },
];

export const cropName = "Crop 1";
export const cropType = "paddy";


export const majorOps = [
  { value: '', label: 'None' },
  { value: 'Input 1', label: 'Input 1' },
  { value: 'Input 2', label: 'Input 2' },
  { value: 'Input 3', label: 'Input 3' },
];
export const subOps = [
  { value: '', label: 'None' },
  { value: 'Input 1', label: 'Input 1' },
  { value: 'Input 2', label: 'Input 2' },
  { value: 'Input 3', label: 'Input 3' },
];

export const machinery = [
  { value: '', label: 'None' },
  { value: 'Method 1', label: 'Method 1' },
  { value: 'Method 2', label: 'Method 2' },
  { value: 'Method 1', label: 'Method 3' },
];
export const material = [
  { value: '', label: 'None' },
  { value: 'Material 1', label: 'Material 1' },
  { value: 'Material 2', label: 'Material 2' },
  { value: 'Material 3', label: 'Material 3' },
];