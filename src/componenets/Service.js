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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
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
  const [isCreateService, setIsCreateService] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [editService, setEditService] = useState({});

  useEffect(() => {
    fetch("https://crm-node-delta.vercel.app/service-request")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateService = () => {
    setIsCreateService(true);
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
    if (!name || !email || !phone || !description  || !status) {
      alert("All fields are mandatory!");
      return;
    }
    const requestMethod = isCreateService ? "POST" : "PUT";
    const api = isCreateService
      ? "https://crm-node-delta.vercel.app/service-request"
      : `https://crm-node-delta.vercel.app/service-request/${editService.email}`;
    fetch(api, {
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
        if (isCreateService) {
          setServices([...services, data]);
          alert("Service created successfully!");
          window.location.reload();
        } else {
          const updatedServices = services.map((service) => {
            if (service.email === editService.email) {
              return data;
            }
            return service;
          });
          setServices(updatedServices);
          alert("Service updated successfully!");
          window.location.reload();
        }
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (service) => {
    setIsCreateService(false);
    setOpen(true);
    setName(service.name);
    setEmail(service.email);
    setPhone(service.phone);
    setDescription(service.description);
    setStatus(service.status);
    setEditService(service);
  };

  const handleDelete = (email) => {
    fetch(`https://crm-node-delta.vercel.app/service-request/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedServices = services.filter((service) => service.email !== email);
        setServices(updatedServices);
        alert("Service deleted successfully!");
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
              <Typography variant="h6">Leads</Typography>
            </Button>
            <Button component={Link} to="/contacts">
              <Typography variant="h6">Contacts</Typography>
            </Button>
            
          </div>
        </Toolbar>
      </AppBar>{" "}
      <br></br>
      <Button color="secondary" variant="contained" onClick={handleCreateService}>
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
              <b>description</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
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
                <IconButton onClick={() => handleEdit(service)}>
                  <EditIcon />
                </IconButton>
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
            label="description"
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
