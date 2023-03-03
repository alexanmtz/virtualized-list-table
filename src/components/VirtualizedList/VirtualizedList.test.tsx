import React from 'react';
import { render, screen } from '@testing-library/react';
import { VirtualizedList } from './VirtualizedList';

type row = {
  name: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

type RowProps = {
  row: row;
  index: number;
}

test('renders virtualized list table container with no data', () => {
  render(
    <VirtualizedList
      renderItem={() => <div />}
      itemCount={0}
      columnData={[]}
    />
  );
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
});

test('renders virtualized list table container with data', () => {
  render(
    <VirtualizedList
      renderItem={({index, style}:any) => <div key={index}>{`test-${index}`}</div>}
      itemCount={1}
      columnData={['name']}
    />
  );
  const tableElement = screen.getByText('test-0');
  expect(tableElement).toBeInTheDocument();
});

test('renders virtualized list table container with data and a height and scrolling', async () => {
  const data = [
    {name: 'test'},
    {name: 'another test'},
    {name: 'one more test'},
    {name: 'another one more test'},
    {name: 'one more one more test'},
    {name: 'another one more one more test'},
  ]
  render(
    <VirtualizedList
      height={100}
      renderItem={({index, style}:any) => <div key={index}>{`row-${index}`}</div>}
      itemHeight={50}
      itemCount={data.length}
      columnData={['name', 'another name', 'one more name', 'another one more name', 'one more one more name', 'another one more one more name']}
    />
  );

  const tableRowName = screen.getByText('row-3');
  expect(tableRowName).toBeInTheDocument();
});
