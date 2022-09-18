const KEYS ={
    employees:'employees',
    employeeId:'employeeId'
}

export const getDepartmentCollection = ()=>([
    { id: '1', title: 'PICK-UP' },
    { id: '2', title: 'MINI-TRUCK' },
    { id: '3', title: 'TRUCK' },
    { id: '4', title: 'CAR-TAXI' },
    { id: '5', title: 'AUTO' },
    { id: '6', title: 'TRACTOR' },
    { id: '7', title: 'JCB-CRANE' },
    { id: '8', title: 'TRAVELS MINI-TRAVELS' },
    { id: '9', title: 'OTHER' },
])
export const getStates = ()=>([
    {value:0,title:'PAN INDIA'},
    {value:1,title:'Andman Nicobar'},
    {value:2,title:'Andra Pradesh'},
    {value:3,title:'Arunachal Pradesh'},
    {value:4,title:'Asam'},
    {value:5,title:'Bihar'},
    {value:6,title:'Chandigarh'},
    {value:7,title:'Chhattisgarh'},
    {value:8,title:'Dadra and Nagar Haveli'},
    {value:9,title:'Daman and Diu'},
    {value:10,title:'Delhi'},
    
    {value:11,title:'Goa'},
    {value:12,title:'Gujrat'},
    {value:13,title:'Hariyana'},
    {value:14,title:'Himachal Pradesh'},
    {value:15,title:'Jammu and Kashmir'},
    {value:16,title:'Jharkhand'},
    {value:17,title:'Karnataka'},
    {value:18,title:'Kerala'},
    {value:19,title:'Lakshadweep'},
    {value:20,title:'Madhya Pradesh'},
    
    {value:21,title:'Maharashtra'},
    {value:22,title:'Manipur'},
    {value:23,title:'Meghalaya'},
    {value:24,title:'Mizoram'},
    {value:25,title:'Nagaland'},
    {value:26,title:'Orissa'},
    {value:27,title:'Puducherry'},
    {value:28,title:'Punjab'},
    {value:29,title:'Rajasthan'},
    {value:30,title:'Sikkim'},

    {value:31,title:'Tamil Nadu'},
    {value:32,title:'Telangana'},
    {value:33,title:'Tripura'},
    {value:34,title:'Uttar Pradesh'},
    {value:35,title:'Uttarakhand'},
    {value:36,title:'West Bengal'},
    {value:37,title:'Other'},
]);

export const getDistricts = ()=>([
    {value:0,title:'ONLY MY CITY'},
    {value:1,title:'Ahmednagar'},
    {value:2,title:'Akola'},
    {value:3,title:'Amravati'},
    {value:4,title:'Aurangabad'},
    {value:5,title:'Beed'},
    {value:6,title:'Bhandra'},
    {value:7,title:'Buldhana'},
    {value:8,title:'Chandrapur'},
    {value:9,title:'Dhule'},
    {value:10,title:'Gadchiroli'},
    
    {value:11,title:'Gondia'},
    {value:12,title:'Hingoli'},
    {value:13,title:'Jalgoan'},
    {value:14,title:'Jalna'},
    {value:15,title:'Kohalapur'},
    {value:16,title:'Latur'},
    {value:17,title:'Mumbai City'},
    {value:18,title:'Mumbai Suburban'},
    {value:19,title:'Nagpur'},
    {value:20,title:'Nanded'},
    
    {value:21,title:'Nandurbar'},
    {value:22,title:'Nashik'},
    {value:23,title:'Osmanbad'},
    {value:24,title:'Palghar'},
    {value:25,title:'Parbhani'},
    {value:26,title:'Pune'},
    {value:27,title:'Raigad'},
    {value:28,title:'Ratnagiri'},
    {value:29,title:'Sangli'},
    {value:30,title:'Satara'},

    {value:31,title:'Sindhudurg'},
    {value:32,title:'Solhapur'},
    {value:33,title:'Thane'},
    {value:34,title:'Wardha'},
    {value:35,title:'Washim'},
    {value:36,title:'Yavatmal'},
    {value:37,title:'Other'},
])

export function insertEmployee(data) {
    console.log(data)
    let employees=getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.employees));
}