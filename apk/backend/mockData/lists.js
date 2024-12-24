const lists = [
    {
        id: '1',
        name: 'Groceries',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Owner' }
        ],
        items: [
            { name: 'Milk', description: '2 liters of milk', isDone: false },
            { name: 'Bread', description: 'Whole grain bread', isDone: false }
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
            { name: 'Notebook', description: 'A4 notebook for meetings', isDone: false },
            { name: 'Pen', description: 'Blue ink pen', isDone: false }
        ]
    },
    {
        id: '3',
        name: 'Holiday Planning',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Owner' }
        ],
        items: [
            { name: 'Tickets', description: 'Flight tickets to Paris', isDone: false },
            { name: 'Hotel', description: 'Booking at Hotel Eiffel', isDone: false }
        ]
    },
    {
        id: '4',
        name: 'Fitness Goals',
        users: [
            { userId: '3', username: 'AliceBrown', role: 'Owner' }
        ],
        items: [
            { name: 'Yoga Mat', description: 'Non-slip yoga mat', isDone: false },
            { name: 'Dumbbells', description: 'Set of adjustable dumbbells', isDone: false }
        ]
    },
    {
        id: '5',
        name: 'Reading List',
        users: [
            { userId: '2', username: 'JaneSmith', role: 'Member' }
        ],
        items: [
            { name: 'Book 1', description: 'Learn JavaScript in 24 Hours', isDone: false },
            { name: 'Book 2', description: 'Eloquent JavaScript', isDone: false }
        ]
    },
];

export default lists;
