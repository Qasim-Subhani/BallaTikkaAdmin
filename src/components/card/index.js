import React from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
    // width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export const Card = ({
  title,
  price,
  id,
  image,
  description,
  category,
  Type,
  cookTime,
  salePrice,
}) => {
  const classes = useStyles();

  const DeleteRecord = () => {
    let fs = firebase.firestore();
    let collectionRef = fs.collection("Products");

    collectionRef
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
              alert("deleted Sucessfully!!");
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                // src="https://firebasestorage.googleapis.com/v0/b/ballatikka-55a10.appspot.com/o/Assets%2FMalai%20Boti.jpeg?alt=media&token=b1e86faa-b431-4860-9c31-a1368f8a1752"
                src={image}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {"Category : " + category}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {"Type : " + Type}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {"CookTime : " + cookTime}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {"ID: " + id}
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={DeleteRecord} color="secondary">
                  Delete
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{"Rs." + price}</Typography>
              <Typography variant="subtitle1">{"Sale:" + salePrice}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
