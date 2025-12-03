import {render, screen, cleanup } from '@testing-library/react'
import About from '../about.component'

test('should render "about" component', () => {
    render(<About/>);
    const aboutElement = screen.getByTestId('about-1');
    expect(aboutElement).toBeInTheDocument();
    expect(aboutElement).toHaveTextContent('About CC Electrical');
})