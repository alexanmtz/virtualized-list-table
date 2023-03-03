import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

type FormDialogProps = {
  onAdd: (data: any) => void;
}

export default function FormDialog({ onAdd }:FormDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [ formValues, setFormValues ] = React.useState({});

  type formDataProps = {
    name: string;
    label: string;
    type: string;
  }

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

  const handleTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAdd = () => {
    onAdd(formValues);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new item
        <AddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new item to the diet
          </DialogContentText>
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
