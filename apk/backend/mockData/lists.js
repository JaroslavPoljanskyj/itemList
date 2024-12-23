const lists = [
    {
        id: '1',
        name: 'Groceries',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Owner' }
        ],
        items: [
            { name: 'Milk', description: '2 liters of milk' },
            { name: 'Bread', description: 'Whole grain bread' }
        ]
    },
    {
        id: '2',
        name: 'Work Supplies',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Member' },
            { userId: '3', username: 'AliceBrown', role: 'Owner' }
        ],
        items: [
            { name: 'Notebook', description: 'A4 notebook for meetings' },
            { name: 'Pen', description: 'Blue ink pen' }
        ]
    },
    {
        id: '3',
        name: 'Holiday Planning',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Owner' }
        ],
        items: [
            { name: 'Tickets', description: 'Flight tickets to Paris' },
            { name: 'Hotel', description: 'Booking at Hotel Eiffel' }
        ]
    },
    {
        id: '4',
        name: 'Fitness Goals',
        users: [
            { userId: '3', username: 'AliceBrown', role: 'Owner' }
        ],
        items: [
            { name: 'Yoga Mat', description: 'Non-slip yoga mat' },
            { name: 'Dumbbells', description: 'Set of adjustable dumbbells' }
        ]
    },
    {
        id: '5',
        name: 'Reading List',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Member' }
        ],
        items: [
            { name: 'Book 1', description: 'Learn JavaScript in 24 Hours' },
            { name: 'Book 2', description: 'Eloquent JavaScript' }
        ]
    },
];
export default lists;