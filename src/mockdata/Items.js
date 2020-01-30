import uuidv4 from "uuid/v4"; // tu dong sinh id

const Items = [
    {
        id: uuidv4(),
        name: "Học HTML và CSS3",
        level: 2 // high
    },
    {
        id: uuidv4(),
        name: "Học Javascript",
        level: 1 // medium
    },
    {
        id: uuidv4(),
        name: "Học NodeJS",
        level: 0 // low
    },
    {
        id: uuidv4(),
        name: "Học React",
        level: 2 // high
    },
    
];

export default Items;