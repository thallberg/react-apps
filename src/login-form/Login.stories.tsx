import { Meta, StoryObj } from '@storybook/react';
import { LoginForm, LoginFormProps } from './LoginForm';

const meta: Meta<LoginFormProps> = {
  title: 'Forms/LoginForm',
  component: LoginForm,
  args: {
    labelUsername: 'Användarnamn',
    labelPassword: 'Lösenord',
    labelSubmit: 'Logga in',
    initialTab: 'Butik',
    tabs: ['Affärsstöd', 'Verkstad', 'Butik'],
  },
  argTypes: {
    labelUsername: { control: 'text', description: 'Etikett för användarnamn' },
    labelPassword: { control: 'text', description: 'Etikett för lösenord' },
    labelSubmit: { control: 'text', description: 'Text för login-knapp' },
    initialTab: {
      control: 'radio',
      options: ['Affärsstöd', 'Verkstad', 'Butik'],
      description: 'Förvalt vald tab',
    },
    tabs: {
      control: 'array',
      description: 'Lista över flikar',
    },
    onSubmit: { action: 'form submitted' },
  },
};

export default meta;

type Story = StoryObj<LoginFormProps>;

export const Primary: Story = {
  args: {
    labelUsername: 'Användarnamn',
    labelPassword: 'Lösenord',
    labelSubmit: 'Logga in',
    initialTab: 'Butik',
    tabs: ['Affärsstöd', 'Verkstad', 'Butik'],
  },
};

export const Secondary: Story = {
  args: {
    labelUsername: 'Username',
    labelPassword: 'Password',
    labelSubmit: 'Sign in',
    initialTab: 'Verkstad',
    tabs: ['Support', 'Repair', 'Store'],
  },
};
