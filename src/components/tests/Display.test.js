import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
jest.mock('./../../api/fetchShow');
import Display from './../Display';

const data = {
    name: "",
    summary: "",
    seasons: [
        { id: 1, name: "caterpillar", episodes: [] },
        { id: 2, name: "cocoon", episodes: [] },
        { id: 3, name: "butterfly", episodes: [] }
    ]
}

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', ()=>{
    fetchShow.mockResolvedValueOnce(data);

    render(<Display show={data} />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    const showComponent = await screen.findByTestId("show-container");

    expect(showComponent).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', ()=>{
    fetchShow.mockResolvedValueOnce(data);

    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    
    await waitFor(() => {
        const seasons = screen.getAllByTestId("season-option");
        expect(seasons).toHaveLength(3);
    });