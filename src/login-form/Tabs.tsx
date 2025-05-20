export interface TabProps {
  tabs: string[];
  active: string;
  onTabChange: (tab: string) => void;
}

export function Tabs({ tabs, active, onTabChange }: TabProps) {
  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2 px-4 text-center transition ${
            active === tab
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
              : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}



// <Tabs tabs={TABS} active={activeTab} onTabChange={setActiveTab} />
