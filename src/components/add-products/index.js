import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Alert, AlertTitle } from "@material-ui/lab";
import firebase from "firebase";

const Type = [
  {
    value: "Regular item",
    label: "Regular item",
  },
  {
    value: "Deal item",
    label: "Deal item",
  },
];

const catagories = [
  {
    value: "NAAN",
    label: "NAAN",
  },
  {
    value: "BARB.Q",
    label: "BARB.Q",
  },
  {
    value: "CHICKENPULAO",
    label: "CHICKENPULAO",
  },
  {
    value: "OFFERS",
    label: "OFFERS",
  },
  {
    value: "SWEETS",
    label: "SWEETS",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export function AddProducts() {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [itemType, setitemType] = useState();
  const [validationError, setvalidationError] = useState(false);
  const handelCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleTypeChange = (event) => {
    setitemType(event.target.value);
  };

  //Saving Data into the DataBase
  const SaveData = () => {
    if (
      title !== "" &&
      category !== "" &&
      cookTime !== "" &&
      description !== "" &&
      quantity !== "" &&
      price !== "" &&
      url !== "" &&
      itemType !== "" &&
      id !== ""
    ) {
      console.log("All fiels ar filled");
      const db = firebase.firestore();
      db.collection("Products")
        .add({
          name: title,
          Type: itemType,
          image: url,
          id: id,
          price: price,
          qty: quantity,
          CookTime: cookTime,
          SalePrice: salePrice,
          Description: description,
          Category: category,
        })
        .then((snapshot) => {
          alert("Item Added SucessFully! with id ", snapshot.id);
        })
        .catch((e) => alert("Error While Adding data "));
    } else {
      setvalidationError(true);
      setTimeout(() => {
        setvalidationError(false);
      }, 2000);
    }
  };

  const [title, settitle] = useState("");
  // const [category, setcategory] = useState('');
  const [cookTime, setcookTime] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [salePrice, setsalePrice] = useState("");
  const [url, seturl] = useState("");
  const [id, setid] = useState("");
  return (
    <div className={classes.root}>
      <div>
        <TextField
          id="standard-full-width"
          label="Title"
          style={{ margin: 8 }}
          placeholder="Enter the Title of Product here."
          //   helperText="Full width!"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Select Category"
            value={category}
            onChange={handelCategoryChange}
            helperText="Please select your Category"
          >
            {catagories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          label="Cook Time"
          id="margin-dense"
          value={cookTime}
          onChange={(e) => setcookTime(e.target.value)}
          className={classes.textField}
          helperText="Please Enter your Cook Time"
          margin="dense"
        />
      </div>
      <div>
        <TextField
          id="filled-full-width"
          label="Description"
          style={{ margin: 8, marginBottom: 10 }}
          placeholder="Enter Your Description here..."
          fullWidth
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          //   variant="filled"
        />
        <TextField
          id="filled-number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setquantity(e.target.value)}
          type="number"
          style={{ marginTop: 20, marginLeft: 10 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="price"
          label="Price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          style={{ margin: 8, marginTop: 18, marginLeft: 15 }}
          placeholder="Enter the Price here."
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="salePrice"
          label="Sale Price"
          style={{ margin: 8, marginTop: 18, marginLeft: 15 }}
          value={salePrice}
          onChange={(e) => setsalePrice(e.target.value)}
          placeholder="Enter the Sale-Price here."
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-full-width"
          label="Image URL"
          style={{ margin: 8 }}
          placeholder="Paste Image URL here(Uploaded on firebase)"
          helperText="Full width!"
          value={url}
          onChange={(e) => seturl(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <>
          <TextField
            id="TypeOfProduct"
            select
            label="Select Type"
            value={itemType}
            onChange={handleTypeChange}
            helperText="Please select your Type"
          >
            {Type.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </>
        <TextField
          id="idOfProduct"
          label="Id of Product"
          style={{ margin: 8, marginTop: -1, marginLeft: 12 }}
          placeholder="Enter the Id of Product here."
          margin="normal"
          value={id}
          onChange={(e) => setid(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 20 }}
        className={classes.button}
        fullWidth
        onClick={SaveData}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      {validationError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please Fill the above all Fields <strong>check it out again!</strong>
        </Alert>
      )}
    </div>
  );
}
