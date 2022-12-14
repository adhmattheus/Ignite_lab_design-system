import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SignIn } from './Signin';
import { rest } from 'msw';

export default {
  title: 'Pages/Sign In',
  component: SignIn,
  args: {
  },
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(ctx.json({
            message: 'Login realizado!'
          }))
        })
      ]
    }
  }
} as Meta

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.type(canvas.getByPlaceholderText('Digite seu email'), 'mattheusadhonnaysf@hotmail.com.br')
    userEvent.type(canvas.getByPlaceholderText('*******'), '12345678')

    userEvent.click(canvas.getByRole('button'))

    await waitFor(() => {
      expect(canvas.getByText('Login realizado!')).toBeInTheDocument();
    })
  }
}
