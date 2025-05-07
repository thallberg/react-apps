import type { Meta, StoryObj } from "@storybook/react";
import { RichTextarea } from "../components/RichTextArea";


const meta: Meta<typeof RichTextarea> = {
  title: "Components/RichTextarea",
  component: RichTextarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RichTextarea>;

export const Default: Story = {
  args: {
    placeholder: "Skriv ett meddelande...",
    initialContent: "",
    onChange: (html: string) => console.log("Default content:", html),
  },
};

export const CustomButtons: Story = {
  args: {
    placeholder: "Anpassad toolbar",
    buttons: [
      { label: "B", command: "bold" },
      { label: "I", command: "italic" },
      { label: "U", command: "underline" },
      { label: "A+", command: "fontSize", value: "5" },
      { label: "🧽", command: "removeFormat" },
    ],
    onChange: (html: string) => console.log("Custom toolbar content:", html),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Detta fält är inaktiverat",
    initialContent: "<p>Du kan inte ändra mig 😅</p>",
    disabled: true,
  },
};

export const ExtendedToolbar: Story = {
    args: {
      placeholder: "Skriv med stil...",
      onChange: (html: string) => console.log("Innehåll:", html),
    },
  };
  