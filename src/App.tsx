import { useState } from 'react';

const initialItems = [
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: true },
    { id: 3, description: 'Charger', quantity: 1, packed: false },
];

interface IItem {
    id: number;
    description: string;
    quantity: number;
    packed: boolean;
}

function App() {
    const [items, setItems] = useState<IItem[]>([]);

    function handleAddItems(item: IItem) {
        setItems((items) => [...items, item]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>😎 Far Away 😁</h1>;
}

function Form({ onAddItems }: { onAddItems: (item: IItem) => void }) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!description) return;
        const newItem: IItem = {
            id: Date.now(),
            description,
            quantity,
            packed: false,
        };
        console.log(newItem);

        onAddItems(newItem);

        setDescription('');
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items }: { items: IItem[] }) {
    return (
        <div className="list">
            <ul>
                {items.map((item: IItem) => (
                    <Item key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item }: { item: IItem }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>
                ✌ You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    );
}

export default App;
