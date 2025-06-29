export default function Tabs({ activeTab, setActiveTab, setScreen }) {
  const tabs = [
    { name: "Practice", icon: "/icons/practice.png" },
    { name: "Games", icon: "/icons/games.png" },
    { name: "Library", icon: "/icons/library.png" },
  ];

  return (
    <div className="flex justify-center gap-6 w-full max-w-md  mb-10">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => {
            if (tab.name === "Practice") {
              setScreen("practice");
            } else if (tab.name === "Games") {
              setScreen("games");
            } else if (tab.name === "Library") {
              setScreen("library");
            }
          }}
          className={`flex flex-col items-center justify-center w-24 h-28 p-3 rounded-xl shadow-md transition-all duration-200 ${
            activeTab === tab.name
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white"
          }`}
        >
          <img src={tab.icon} alt={tab.name} className="w-10 h-10 mb-2" />
          <span className="text-sm font-medium">{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
