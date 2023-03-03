import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState, createRef } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { VirtualizedList } from './components/VirtualizedList/VirtualizedList';
import './App.css';

import FormDialog from './components/Dialog/Dialog';

const fakeDataRowsAmount:number = 10000000;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type row = {
  name: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
):row {
  return { name, calories, fat, carbs, protein };
}

const randomNumbers = (min:number, max:number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rows = new Array(fakeDataRowsAmount).fill(0).map((row, index) => createData(
  `Food ${index}`,
  randomNumbers(1, 2000),
  randomNumbers(1, 100),
  randomNumbers(1, 100),
  randomNumbers(1, 100)
));

const columnData: Array<string> = [
  'Dessert (100g serving)',
  'Calories',
  'Fat (g)',
  'Carbs (g)',
  'Protein (g)',
]

type formDataProps = {
  name: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
}

function App(): JSX.Element {
  const [ listRows, setListRows ] = useState<Array<row>>(rows);

  const onAdd = (formData:formDataProps) => {
    const newRow = createData(
      formData.name,
      Number(formData.calories),
      Number(formData.fat),
      Number(formData.carbs),
      Number(formData.protein),
    );
    setListRows([...listRows, newRow]);
  }

  const Row = ({index, style}:any) => {
    const cellSize = 240;
    return (
      <StyledTableRow key={`table-row-${index}`} style={style}>
        <TableCell width={cellSize} component="th" scope="row">
          {listRows[index].name}
        </TableCell>
        <TableCell width={cellSize} align="right">{listRows[index].calories}</TableCell>
        <TableCell width={cellSize} align="right">{listRows[index].fat}</TableCell>
        <TableCell width={cellSize} align="right">{listRows[index].carbs}</TableCell>
        <TableCell width={cellSize} align="right">{listRows[index].protein}</TableCell>
      </StyledTableRow>
    );
  };

  return (
    <Container maxWidth="lg">
      <div className="App">
        <header className="App-header">
          <Typography variant="h4" gutterBottom>
            Virtualized lists
          </Typography>
          <div style={{position: 'absolute', right: 5}}>
            <FormDialog onAdd={onAdd} />
          </div>
        </header>
        <VirtualizedList
          height={600}
          itemHeight={52}
          renderItem={Row}
          itemCount={listRows.length}
          columnData={columnData}
        />
      </div>
    </Container>
  );
}

export default App;
