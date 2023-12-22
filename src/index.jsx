import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

const APS_MODEL_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtY29kZXBlbi1tb2RlbHMvcnN0LWJhc2ljLXNhbXBsZS1wcm9qZWN0LnJ2dA'; // Specify your model URN

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        fetch('https://aps-universal-test-app.autodesk.io/api/token')
            .then(response => response.json())
            .then(data => {
                setToken(data.access_token);
            })
            .catch(error => {
                console.error('Error fetching token:', error);
            });
    }, []);

    if (!token || !APS_MODEL_URN) {
        return <div>Loading...</div>;
    } else {
        return <App token={token} urn={APS_MODEL_URN} />;
    }
};

root.render(<RootComponent />);
