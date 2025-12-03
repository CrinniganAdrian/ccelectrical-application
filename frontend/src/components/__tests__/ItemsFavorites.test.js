import {render, screen, cleanup } from '@testing-library/react'
import { ItemsFavorites } from '../../pages/ItemsFavorites'

test('should render "favorites" component', () => {
    render(<ItemsFavorites/>);
    const favoritesElement = screen.getByTestId('favorite-1');
    expect(favoritesElement).toBeInTheDocument();
    expect(favoritesElement).toHaveTextContent('Favourite Items');
})