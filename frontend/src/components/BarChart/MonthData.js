const generateRandomValueInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const MonthData = {
    title: 'Monthly Revenue',
    content: [
        { id: 1, label: 'January', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 2, label: 'February', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 3, label: 'March', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 4, label: 'April', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 5, label: 'May', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 6, label: 'June', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 7, label: 'July', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 8, label: 'August', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 9, label: 'September', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 10, label: 'October', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 11, label: 'November', value: generateRandomValueInRange(8000000, 11000000) },
        { id: 12, label: 'December', value: generateRandomValueInRange(8000000, 11000000) },
    ],
};
