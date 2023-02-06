import React, { useState, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Services = () => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [isCreateservice, setIsCreateservice] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:100/service-request")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateService = () => {
    setIsCreateservice(true);
    setOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setStatus("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !phone || !description || !status) {
      alert("All fields are mandatory!");
      return;
    }
    const requestMethod = "POST";

    fetch("http://localhost:100/service-request", {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        description,
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isCreateservice) {
          setServices([...services, data]);
          alert("service created successfully!");
          window.location.reload();
        }
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (email) => {
    fetch(`http://localhost:100/service-request/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedservices = services.filter(
          (service) => service.email !== email
        );
        setServices(updatedservices);
        alert("service deleted successfully!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Service Management
          </Typography>

          <div className={classes.navLinks}>
            <Button component={Link} to="/dashboard">
              <Typography variant="h6">Dashboard</Typography>
            </Button>
            <Button component={Link} to="/leads">
              <Typography variant="h6">leads</Typography>
            </Button>
            <Button component={Link} to="/contacts">
              <Typography variant="h6">Contacts</Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>{" "}
      <br></br>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleCreateService}
      >
        <AddIcon />
        Create service
      </Button>
      <br></br>
      <br></br>
      <Table
        style={{
          width: "90%",
          marginLeft: "2cm",
          marginRight: "auto",
          boxShadow: "0px 0px 20px #3f51b5",
        }}
        className={classes.table}
      >
        <TableHead style={{ backgroundColor: "#FFC107" }}>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Phone</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Delete</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service, index) => (
            <TableRow key={index} service={service.email}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.email}</TableCell>
              <TableCell>{service.phone}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(service.email)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <MenuItem value="Created">Created</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Process">In Process</MenuItem>
              <MenuItem value="Released">Released</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Services;
