const generateRandomValueInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const WeekData = {
    title: 'Weekly Sales',
    content: [
        { id: 1, label: 'Monday', value: generateRandomValueInRange(1000000, 3000000) },
        { id: 2, label: 'Tuesday', value: generateRandomValueInRange(1000000, 3000000) },
        { id: 3, label: 'Wednesday', value: generateRandomValueInRange(1000000, 3000000) },
        { id: 4, label: 'Thursday', value: generateRandomValueInRange(1000000, 3000000) },
        { id: 5, label: 'Friday', value: generateRandomValueInRange(1000000, 3000000) },
        { id: 6, label: 'Saturday', value: generateRandomValueInRange(1000000, 3000000) },
        { id: 7, label: 'Sunday', value: generateRandomValueInRange(1000000, 3000000) },
    ],
};
