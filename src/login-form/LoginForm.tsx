import { useState } from 'react';
import { Form, Tabs } from "radux-ui";
import { Button } from '../components/Button';
import { InputText } from '../components/InputText';
import Logo from "./Verendus_logo.svg"

// const TABS = ["Affärsstöd", "Verkstad", "Butik"] as const;
// type TabType = typeof TABS[number];

export interface LoginFormProps {
    tabs: string[];
    username?: string;
    password?: string;
    onSubmit?: (tabPage: { username: string; password: string; tab: string }) => void;
    onReset?: (identifier: string) => void;
    initialTab?: string;
    labelUsername?: string;
    labelPassword?: string;
    labelSubmit?: string;
    spanText?: string;
    resetLabel?: string;
    resetSubmit?: string;
}

export function LoginForm({
    tabs = ['Affärsstöd', 'Verkstad', 'Butik'],
    username: initialUsername = '',
    password: initialPassword = '',
    labelUsername = 'Användarnamn',
    labelPassword = 'Lösenord',
    labelSubmit = 'Logga in',
    initialTab = 'Affärsstöd',
    spanText = 'Glömt lösenord?',
    resetLabel = 'Återställ lösenord',
    resetSubmit = 'Återställ',
    onSubmit,
    onReset,
}: LoginFormProps) {
    const [activeTab, setActiveTab] = useState(initialTab || tabs[0]);
    const [username, setUsername] = useState(initialUsername);
    const [password, setPassword] = useState(initialPassword);
    const [resetIdentifier, setResetIdentifier] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        onSubmit?.({ username, password, tab: activeTab });
    };

    const handleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col gap-4 w-80 h-auto">
            <div className="mb-6">
                <img src={Logo} alt="Logo" className="h-auto w-auto" />
            </div>

            {/* Tabs */}
            <Tabs.Root className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List className="flex w-full">
                    {tabs.map((tab) => (
                        <Tabs.Trigger
                            key={tab}
                            value={tab}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                        >
                            {tab}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Tabs.Root>

            {/* Inputs */}
            <div className="space-y-4">
                <label className="block text-sm mb-1">{labelUsername}</label>
                <InputText
                    required
                    minChar={3}
                    maxChar={50}
                    value={username}
                    onChange={setUsername}
                    inputType="text"
                />
                <label className="block text-sm mb-1">{labelPassword}</label>
                <InputText
                    required
                    minChar={6}
                    maxChar={128}
                    value={password}
                    onChange={setPassword}
                    inputType="password"
                />
            </div>

            {/* Submit */}
            <Button onClick={handleSubmit} className="">{labelSubmit}</Button>
            <span onClick={handleOpen}> {spanText}</span>

            {/* reset Password */}

            {isOpen && (

                <div className="flex flex-col gap-2 mt-4">
                    <label className="block text-sm mb-1">{resetLabel}</label>
                    <div>
                        <InputText
                            inputType="text"
                            onChange={setResetIdentifier}

                        />
                        <Button onClick={() => onReset?.(resetIdentifier)} className="">{resetSubmit}</Button>
                    </div>
                </div>

            )}


        </div>
    );
}
