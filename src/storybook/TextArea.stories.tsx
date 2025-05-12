import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "../components/TextArea";


const meta: Meta<typeof TextArea> = {
    title: "TextArea",
    component: TextArea,
    args: {
        label: "",
        placeholderText: "Skriv något...",
        isResizable: false,
        isDisabled: false,

    }
}

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        label: 'label',
        placeholderText: 'placeholder',
        isResizable: false,
        isDisabled: false
    }
};

export const Disabled: Story = {
    args: {
        label: "Disabled",
        isDisabled: true,
        placeholderText: "Detta är inaktiverat",
    },
};

export const Resizeable: Story = {
    args: {
        label: "Resizable",
        isResizable: true,
        placeholderText: "Dra för att ändra storlek",
    },
};

export const FocusWithin: Story = {
    args: {
        label: "focus within",
        isResizable: true,
        placeholderText: "Klicka för blå fokus",
        className: "focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:ring-offset-1"
    },
};