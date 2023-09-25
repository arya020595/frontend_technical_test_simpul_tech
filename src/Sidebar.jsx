import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
            <li>Dashboard</li>
            <li>Reports</li>
            <li>Settings</li>
            {/* Add more sidebar items as needed */}
        </ul>
        </div>
    );
};

export default Sidebar;