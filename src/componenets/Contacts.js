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

const ContactTable = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isCreatecontact, setIsCreatecontact] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [company, setCompany] = useState("");
  const [editcontact, setEditcontact] = useState({});

  useEffect(() => {
    fetch("https://crm-node-delta.vercel.app/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreatecontact = () => {
    setIsCreatecontact(true);
    setOpen(true);
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
    setCompany("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !phone || !city || !state || !company) {
      alert("All fields are mandatory!");
      return;
    }
    const requestMethod = isCreatecontact ? "POST" : "PUT";
    const api = isCreatecontact
      ? "https://crm-node-delta.vercel.app/contacts"
      : `https://crm-node-delta.vercel.app/contacts/${editcontact.email}`;
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
        company,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isCreatecontact) {
          setContacts([...contacts, data]);
          alert("contact created successfully!");
          window.location.reload();
        } else {
          const updatedcontacts = contacts.map((contact) => {
            if (contact.email === editcontact.email) {
              return data;
            }
            return contact;
          });
          setContacts(updatedcontacts);
          alert("contact updated successfully!");
          window.location.reload();
        }
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (contact) => {
    setIsCreatecontact(false);
    setOpen(true);
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setCity(contact.city);
    setState(contact.state);
    setCompany(contact.company);
    setEditcontact(contact);
  };

  const handleDelete = (email) => {
    fetch(`https://crm-node-delta.vercel.app/contacts/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedcontacts = contacts.filter(
          (contact) => contact.email !== email
        );
        setContacts(updatedcontacts);
        alert("contact deleted successfully!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Contact Management
          </Typography>

          <div className={classes.navLinks}>
            <Button component={Link} to="/dashboard">
              <Typography variant="h6">Dashboard</Typography>
            </Button>
            <Button component={Link} to="/leads">
              <Typography variant="h6">Leads</Typography>
            </Button>
            <Button component={Link} to="/service-request">
              <Typography variant="h6">Service Requests</Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <br></br>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleCreatecontact}
      >
        <AddIcon />
        Create Contact
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
              <b>Company</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index} contact={contact.email}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell>{contact.state}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(contact)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(contact.email)}>
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
          <TextField
            label="Company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            fullWidth
          />
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

export default ContactTable;
