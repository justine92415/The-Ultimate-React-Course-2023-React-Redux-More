import './App.css';

interface ISkill {
    skill: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    color: string;
}

enum SkillLevel {
    beginner = '😐',
    intermediate = '🤔',
    advanced = '🤗',
}

const skills: ISkill[] = [
    {
        skill: 'HTML+CSS',
        level: 'advanced',
        color: '#2662EA',
    },
    {
        skill: 'JavaScript',
        level: 'advanced',
        color: '#EFD81D',
    },
    {
        skill: 'Web Design',
        level: 'advanced',
        color: '#C3DCAF',
    },
    {
        skill: 'Git and GitHub',
        level: 'intermediate',
        color: '#E84F33',
    },
    {
        skill: 'React',
        level: 'advanced',
        color: '#60DAFB',
    },
    {
        skill: 'Svelte',
        level: 'beginner',
        color: '#FF3B00',
    },
];

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
                <SkillList skills={skills} />
            </div>
        </div>
    );
}

function Avatar(props: { photoPath: string; name: string }) {
    return (
        <img className="avatar" src={props.photoPath} alt={props.name}></img>
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

function SkillList({ skills }: { skills: ISkill[] }) {
    return (
        <div className="skill-list">
            {skills.map((skillObj) => (
                <Skill skillObj={skillObj} key={skillObj.skill} />
            ))}
        </div>
    );
}
function Skill({ skillObj }: { skillObj: ISkill }) {
    const { skill, level, color } = skillObj;
    return (
        <div className="skill" style={{ backgroundColor: color }}>
            <span>{skill}</span>
            <span>{SkillLevel[level]}</span>
        </div>
    );
}

export default App;
