import { useState } from 'react';
import { Button } from '../components/Button';
import { InputText } from '../components/InputText';

const TABS = ["Affärsstöd", "Verkstad", "Butik"] as const;
type TabType = typeof TABS[number];

export interface LoginFormProps {
    username?: string;
    password?: string;
    initialTab?: TabType;
    onSubmit?: (tabPage: { username: string; password: string; tab: TabType }) => void;

    usernameLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;

    usernamePlaceholder?: string;
    passwordPlaceholder?: string;
}

export function LoginForm({
    username: initialUsername = '',
    password: initialPassword = '',
    initialTab = 'Butik',
    onSubmit,
    usernameLabel = 'Användarnamn',
    passwordLabel = 'Lösenord',
    submitLabel = 'Logga in',
    usernamePlaceholder = 'Ange användarnamn',
    passwordPlaceholder = 'Ange lösenord',
}: LoginFormProps) {
    const [activeTab, setActiveTab] = useState<TabType>(initialTab);
    const [username, setUsername] = useState(initialUsername);
    const [password, setPassword] = useState(initialPassword);

    const handleSubmit = () => {
        const tabPage = {
            username,
            password,
            tab: activeTab,
        };
        console.log('Login payload:', tabPage);
        if (onSubmit) {
            onSubmit(tabPage);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <div className="text-center mb-6">Logga</div>

            {/* Tabs */}
            <div className="flex mb-6 border-b">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-4 text-center transition ${activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                            : 'text-gray-500 hover:text-blue-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <label className="block text-sm mb-1">{usernameLabel}</label>
                <InputText
                    required
                   placeholder={usernamePlaceholder}
                    minChar={3}
                    maxChar={50}
                    value={username}
                    onChange={setUsername}
                    inputType="text"
                />
                <label className="block text-sm mb-1">{passwordLabel}</label>
                <InputText
                    required
                    placeholder={passwordPlaceholder}
                    minChar={6}
                    maxChar={128}
                    value={password}
                    onChange={setPassword}
                    inputType="password"
                />
            </div>

            {/* Submit */}
            <div className="mt-6">
                <Button onClick={handleSubmit} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    {submitLabel}
                </Button>
            </div>
        </div>
    );
}
