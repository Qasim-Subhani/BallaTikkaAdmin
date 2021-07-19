import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Home } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AiOutlinePlus } from "react-icons/ai";
import { GrDatabase } from "react-icons/gr";
import { Card } from "../card";
import "./styles.scss";
import { Category } from "../Category";
import { AddProducts } from "../add-products";
import { useLocation } from "react-router-dom";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    // flexGrow: 1,
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // padding: theme.spacing(3),
    backgroundColor: "#f9f9f9",
    width: "100%",
    // padding: 100,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [fdata, setfdata] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("Products")
      .get()
      .then((snapshot) => {
        setfdata(snapshot.docs.map((e) => e.data()));
      })
      .catch((e) => console.log("error in fetching data", e));
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const param = useLocation();
  console.log("Products Data is", param.state.products);
  let products = param.state.products;
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {["Dashboard", "Add Products", "View Products"].map((text, index) => (
          <div onClick={() => setscreenName(index)}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <Home />
                ) : (
                  [
                    index === 1 ? (
                      <AiOutlinePlus style={{ fontSize: 25 }} />
                    ) : (
                      <GrDatabase style={{ fontSize: 25 }} />
                    ),
                  ]
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [screenName, setscreenName] = useState(0);

  const Screenhandler = () => {
    if (screenName === 0 || screenName === 2) {
      return <Category Category={fdata} />;
    } else if (screenName === 1) {
      return <AddProducts />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Balla Tikka Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="DashboardContainer">{Screenhandler()}</div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
