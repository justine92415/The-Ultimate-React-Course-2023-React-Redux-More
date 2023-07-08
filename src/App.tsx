import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type Faq = {
    title: string;
    text: string;
};

const faqs: Faq[] = [
    {
        title: 'Where are these chairs assembled?',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
    },
    {
        title: 'How long do I have to return my chair?',
        text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
    },
    {
        title: 'Do you ship to countries outside the EU?',
        text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
    },
];

function App() {
    return (
        <div>
            <Accordion data={faqs} />
        </div>
    );
}

function Accordion({ data }: { data: Faq[] }) {
    return (
        <div className="accordion">
            {data.map((el, i) => (
                <AccordionItem
                    text={el.text}
                    title={el.title}
                    num={i}
                    key={el.title}
                ></AccordionItem>
            ))}
        </div>
    );
}

function AccordionItem({
    num,
    title,
    text,
}: {
    num: number;
    title: string;
    text: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleToggle() {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <div className={`item ${isOpen ? 'open':''}`} onClick={() => handleToggle()}>
            <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? '-' : '+'}</p>

            {isOpen && <div className="content-box">{text}</div>}
        </div>
    );
}

export default App;
