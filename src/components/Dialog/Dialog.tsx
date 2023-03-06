import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type FormDialogProps = {
  onAdd: (data: any) => void;
}

type formDataProps = {
  name?: string;
  label?: string;
  type?: string;
}

type formValuesProps = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FormDialog({ onAdd }:FormDialogProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [ openSnack, setOpenSnack ] = React.useState<boolean>(false);
  const [ formValid, setFormValid ] = React.useState<boolean>(true);
  const [ formValues, setFormValues ] = React.useState<formValuesProps>({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });


  const formData:Array<formDataProps> = [
    {
      name: 'name',
      label: 'Dessert (100g serving)',
      type: 'text'
    },
    {
      name: 'calories',
      label: 'Calories',
      type: 'number'
    },
    {
      name: 'fat',
      label: 'Fat (g)',
      type: 'number'
    },
    {
      name: 'carbs',
      label: 'Carbs (g)',
      type: 'number'
    },
    {
      name: 'protein',
      label: 'Protein (g)',
      type: 'number'
    },
  ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAdd = () => {
    let formEmpty:boolean = false;
    Object.values(formValues).forEach(values => {
      if (values === '') {
        formEmpty = true;
      }
    });
    if(formEmpty) {
      setFormValid(false);
    } else {
      onAdd(formValues);
      setOpenSnack(true);
      setOpen(false);
      setFormValid(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new item
        <AddIcon />
      </Button>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Item added successfully!
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new item to the diet
          </DialogContentText>
          {!formValid && <Alert severity="error">Please fill all the fields with the right information</Alert>}
          {formData.map((data, index) =>
            <TextField
              name={data.name}
              autoFocus
              margin="dense"
              id={data.name}
              label={data.label}
              type={data.type}
              fullWidth
              variant="standard"
              onChange={handleTextField}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
