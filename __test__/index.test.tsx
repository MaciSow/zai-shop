import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterFormView } from '@/components/NewsletterForm';
import { jest, describe, expect, it } from '@jest/globals';

describe('Newsletter', () => {
  it('show success message', () => {
    const success = true;
    const onSubmit = jest.fn();

    render(<NewsletterFormView onSubmit={onSubmit} success={success} />);

    const successMessage = screen.queryByTestId('newsletter-success');
    expect(successMessage).toBeInTheDocument();
  });

  it(`doesn't show success message`, () => {
    const success = false;
    const onSubmit = jest.fn();

    render(<NewsletterFormView onSubmit={onSubmit} success={success} />);

    const successMessage = screen.queryByTestId('newsletter-success');
    expect(successMessage).not.toBeInTheDocument();
  });

  it(`shouldn't submit empty form when button is clicked`, () => {
    const onSubmit = jest.fn();

    render(<NewsletterFormView onSubmit={onSubmit} success={false} />);
    const button = screen.getByTestId('newsletter-submit');

    fireEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it(`should submit filled form when button is clicked`, async () => {
    const onSubmit = jest.fn();

    render(<NewsletterFormView onSubmit={onSubmit} success={false} />);
    const input = screen.getByTestId('newsletter-input');
    const button = screen.getByTestId('newsletter-submit');

    fireEvent.change(input, { target: { value: 'example@test.com' } });
    fireEvent.click(button);

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });
});
