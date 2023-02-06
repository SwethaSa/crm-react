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

const Leads = () => {
  const classes = useStyles();
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const [isCreateLead, setIsCreateLead] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState("");
  const [editLead, setEditLead] = useState({});

  useEffect(() => {
    fetch("https://crm-node-delta.vercel.app/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateLead = () => {
    setIsCreateLead(true);
    setOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
    setStatus("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !phone || !city || !state || !status) {
      alert("All fields are mandatory!");
      return;
    }
    const requestMethod = isCreateLead ? "POST" : "PUT";
    const api = isCreateLead
      ? "https://crm-node-delta.vercel.app/leads"
      : `https://crm-node-delta.vercel.app/leads/${editLead.email}`;
    fetch(api, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        city,
        state,
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isCreateLead) {
          setLeads([...leads, data]);
          alert("Lead created successfully!");
          window.location.reload();
        } else {
          const updatedLeads = leads.map((lead) => {
            if (lead.email === editLead.email) {
              return data;
            }
            return lead;
          });
          setLeads(updatedLeads);
          alert("Lead updated successfully!");
          window.location.reload();
        }
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (lead) => {
    setIsCreateLead(false);
    setOpen(true);
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setCity(lead.city);
    setState(lead.state);
    setStatus(lead.status);
    setEditLead(lead);
  };

  const handleDelete = (email) => {
    fetch(`https://crm-node-delta.vercel.app/leads/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedLeads = leads.filter((lead) => lead.email !== email);
        setLeads(updatedLeads);
        alert("Lead deleted successfully!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Lead Management
          </Typography>

          <div className={classes.navLinks}>
            <Button component={Link} to="/dashboard">
              <Typography variant="h6">Dashboard</Typography>
            </Button>
            <Button component={Link} to="/contacts">
              <Typography variant="h6">Contacts</Typography>
            </Button>
            <Button component={Link} to="/service-request">
              <Typography variant="h6">Service Requests</Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>{" "}
      <br></br>
      <Button color="secondary" variant="contained" onClick={handleCreateLead}>
        <AddIcon />
        Create Lead
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
              <b>City</b>
            </TableCell>
            <TableCell>
              <b>State</b>
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
          {leads.map((lead, index) => (
            <TableRow key={index} lead={lead.email}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.city}</TableCell>
              <TableCell>{lead.state}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(lead)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(lead.email)}>
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
            label="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            fullWidth
          />
          <TextField
            label="State"
            value={state}
            onChange={(event) => setState(event.target.value)}
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
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Contacted">Contacted</MenuItem>
              <MenuItem value="Qualified">Qualified</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
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

export default Leads;
