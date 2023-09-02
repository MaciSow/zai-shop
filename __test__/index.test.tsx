import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewsletterFormView } from '@/components/NewsletterForm';
import { jest, describe, expect, it } from '@jest/globals';

describe('Home', () => {
  it('show success message', () => {
    const status = true;
    const onSubmit = jest.fn();

    render(<NewsletterFormView onSubmit={onSubmit} status={status} />);

    const successMessage = screen.queryByTestId('newsletter-success');
    expect(successMessage).toBeInTheDocument();
  });
});
