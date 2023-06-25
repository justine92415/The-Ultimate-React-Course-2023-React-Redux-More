import React from 'react';
import logo from './logo.svg';
import './index.css';
import { isStringLiteral } from 'typescript';

const pizzaData = [
    {
        name: 'Focaccia',
        ingredients: 'Bread with italian olive oil and rosemary',
        price: 6,
        photoName: 'pizzas/focaccia.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Margherita',
        ingredients: 'Tomato and mozarella',
        price: 10,
        photoName: 'pizzas/margherita.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Spinaci',
        ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
        price: 12,
        photoName: 'pizzas/spinaci.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Funghi',
        ingredients: 'Tomato, mozarella, mushrooms, and onion',
        price: 12,
        photoName: 'pizzas/funghi.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Salamino',
        ingredients: 'Tomato, mozarella, and pepperoni',
        price: 15,
        photoName: 'pizzas/salamino.jpg',
        soldOut: true,
    },
    {
        name: 'Pizza Prosciutto',
        ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
        price: 18,
        photoName: 'pizzas/prosciutto.jpg',
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    return (
        <main className="menu  ">
            <h2>Our Menu</h2>
            <Pizza
                name="Pizza Spinaci"
                ingredients="Tomato, mozarella, spinach, and ricotta cheese"
                photoName="pizzas/spinaci.jpg"
                price={10}
            />

            <Pizza
                name="Pizza Funghi"
                ingredients="Tomoto, mushrooms"
                photoName="pizzas/funghi.jpg"
                price={12}
            />
        </main>
    );
}

function Pizza(props: {
    name: string;
    ingredients: string;
    photoName: string;
    price: number;
}) {
    const { name, ingredients, photoName, price } = props;
    return (
        <div className='pizza'>
            <img src={photoName} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <span>{price + 3}</span>
            </div>
        </div>
    );
}

function Footer() {
    const hour = new Date().getHours();
    const openHour = 8;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour < closeHour;
    console.log(isOpen);
    return (
        <footer className="footer">
            {new Date().toLocaleTimeString()}. We're currently open
        </footer>
    );
}

export default App;
