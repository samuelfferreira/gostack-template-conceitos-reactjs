import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
        })
    }, [])
    
    async function handleAddRepository() {
        const response = await api.post('/repositories', {
            title: `novo repositorio-${Date.now()}`,
            url: "https://github.com/samuelfferreira/gostack-template-conceitos-nodejs",
            techs: ["Node.js", "NPM", "Yarn"],
            likes: 0
        });

        const repository = response.data;
        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        const response = await api.delete(`/repositories/${id}`);
        setRepositories(repositories.filter(x => x.id !== id));
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repo => (
                    <li key={repo.id}>
                        {repo.title}
                        <button onClick={() => handleRemoveRepository(repo.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
