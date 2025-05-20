import { Meta, StoryObj } from '@storybook/react';
import { LoginForm, LoginFormProps } from './LoginForm';

const meta: Meta<LoginFormProps> = {
  title: 'Forms/LoginForm',
  component: LoginForm,
  args: {
    usernameLabel: 'Användarnamn',
    passwordLabel: 'Lösenord',
    submitLabel: 'Logga in',
    initialTab: 'Butik',
  },
  argTypes: {
    usernameLabel: { control: 'text', description: 'Etikett för användarnamn' },
    passwordLabel: { control: 'text', description: 'Etikett för lösenord' },
    submitLabel: { control: 'text', description: 'Text för login-knapp' },
    initialTab: {
      control: 'radio',
      options: ['Affärsstöd', 'Verkstad', 'Butik'],
      description: 'Förvalt vald tab',
    },
    onSubmit: { action: 'form submitted' },
  },
};

export default meta;

type Story = StoryObj<LoginFormProps>;

export const Primary: Story = {
  args: {
    usernameLabel: 'Användarnamn',
    passwordLabel: 'Lösenord',
    submitLabel: 'Logga in',
    initialTab: 'Butik',
  },
};

export const Secondary: Story = {
  args: {
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    submitLabel: 'Sign in',
    initialTab: 'Verkstad',
  },
};
