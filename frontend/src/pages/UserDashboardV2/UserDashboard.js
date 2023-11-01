import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Menu from './components/Menu';
import MacrosWidget from './dysc-components/macroswidget'
import '../../styles/pages/UserDashboardV2/UserDashboard.css';

function UserDashboard() {
    
    const username = 'username';
    
    return(
        <>
            <Nav/>
            <div className="dashboard-page">
                <div className="dashboard-content">
                    <div className="welcome-container">
                        <h1 id="welcome">Welcome,</h1>  
                        <h1 id="username">{username}</h1>
                    </div>
                    <Menu />
                    <MacrosWidget/>
                </div>
                <Background/>            
            </div>
            <Footer/>
        </>
    );
}

function Background() {
    return(
        <div className="dashboard-background">
            <span id="object-1"/>
            <span id="object-2"/>
            <span id="screen"/>
            <span id="noise"/>
        </div>
    );
}

export default UserDashboard;