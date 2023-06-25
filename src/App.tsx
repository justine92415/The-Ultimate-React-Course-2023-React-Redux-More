import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="card">
            <Avatar photoPath="logo192.png" name="React Icon" />
            <div className="data">
                <Intro
                    name="Jonas Schmedtmann"
                    desc="Full-stack web developer and teacher at Udemy. When not coding
                          or preparing a course, I like to play board games, to cook (and
                          eat), or to just enjoy the Portuguese sun at the beach."
                />
                <SkillList skills={['HTML & CSS','JavaScript','Angular','Vue','React']}/>
            </div>
        </div>
    );
}

function Avatar(props: { photoPath: string; name: string }) {
    return (
        <div className="avatar">
            <img src={props.photoPath} alt={props.name}></img>
        </div>
    );
}

function Intro(props: { name: string; desc: string }) {
    return (
        <div>
            <h1> {props.name} </h1>
            <p> {props.desc} </p>
        </div>
    );
}

function SkillList(props: { skills: string[] }) {
    return (
        <ul className="skill-list">
            {props.skills.map(skill => <li>{skill}</li>)}
        </ul>
    );
}

export default App;
