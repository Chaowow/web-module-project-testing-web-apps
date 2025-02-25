import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const header = screen.queryByText(/contact form/i);
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'abcd');
    
    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    });

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'Chaowow');

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, 'Chaowow');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'aaa');

    const errorMessages = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessages).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    const errorMessages = await screen.findByText(/lastName is a required field/i);
    expect(errorMessages).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameInput, 'Chaowow');
    userEvent.type(lastNameInput, 'Jose');
    userEvent.type(emailInput, 'chaowow@thebattle.com');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Chaowow');
        const lastNameDisplay = screen.queryByText('Jose');
        const emailDisplay = screen.queryByText('chaowow@thebattle.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameInput, 'Chaowow');
    userEvent.type(lastNameInput, 'Jose');
    userEvent.type(emailInput, 'chaowow@thebattle.com');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Chaowow');
        const lastNameDisplay = screen.queryByText('Jose');
        const emailDisplay = screen.queryByText('chaowow@thebattle.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});
