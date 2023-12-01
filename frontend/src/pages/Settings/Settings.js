import Background from '../../components/Background';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import '../../styles/pages/Settings/Settings.css';

const Settings = () => {

    const [settings, setSettings] = useState(undefined);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const saveRef = useRef(null);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!settings) {
            axios.get(`${process.env.REACT_APP_API_URL}/settings`, {withCredentials: true})
                .then(response => setSettings(response.data.settings))
                .catch(() => navigate('/'));
        }
    }, [settings]);
    
    const postSettings = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/settings`, {settings}, {withCredentials: true})
            .then(response => { 
                setSettings(response.data.settings);
                setBtnDisabled(true);
            })
            .catch(() => navigate('/'));
    };

    const updateSex = (event) => {
        setSettings({sex: event.target.value, tz: settings.tz});
        setBtnDisabled(false);
    };

    const updateTz = (event) => {
        setSettings({ sex: settings.sex, tz: event.target.value });
        setBtnDisabled(false);
    };

    return (
        <>
            <Nav />
            <div className="user-settings">
                <div className='user-settings-content'>
                    <div className='user-settings-card'>
                        <h2 className='user-settings-title'>Settings</h2>
                        <div className='user-settings-options'>
                            <div className='user-settings-option'>
                                <h4>Sex</h4>
                                <input type="radio" value='male'
                                    checked={settings?.sex === "male"} onChange={updateSex} />
                                <label>Male</label>
                                <input type="radio" value='female'
                                    checked={settings?.sex === "female"} onChange={updateSex} />
                                <label>Female</label>
                            </div>
                            <div className="user-settings-option">
                                <h4>Timezone</h4>
                                <select value={settings?.tz} onChange={updateTz}>
                                    {['pst', 'mst', 'cst', 'est'].map((tz, i) => {
                                        return <option key={i} value={tz}>{tz.toUpperCase()}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <button className="user-settings-save" onClick={postSettings} disabled={btnDisabled}>Save</button>
                    </div>
                </div>
                <Background />
            </div>
            <Footer />
        </>
    );
};

export default Settings;