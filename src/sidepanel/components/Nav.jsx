import NavItem from "./NavItem";

const tabs = [
    { id: "classes", label: "クラス" },
    { id: "about", label: "拡張機能について" },
];

function Nav({ activeTab, setActiveTab }) {
    return (
        <nav className="flex border-b border-gray-300 bg-white">
            {tabs.map(({ id, label }) => (
                <NavItem key={id} isSelected={activeTab === id} onClick={() => setActiveTab(id)}>
                    {label}
                </NavItem>
            ))}
        </nav>
    );
}

export default Nav;
