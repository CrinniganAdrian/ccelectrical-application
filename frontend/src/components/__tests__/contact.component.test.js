import {render, screen, cleanup } from '@testing-library/react'
import Contact from '../contact.component'

test('should render "contact" component', () => {
    render(<Contact/>);
    const contactElement = screen.getByTestId('contact-1');
    expect(contactElement).toBeInTheDocument();
    expect(contactElement).toHaveTextContent('Get In Touch');
    expect(contactElement).toHaveTextContent('Contact Details');
})