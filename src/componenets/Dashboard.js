import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { PieChart, Pie, Cell } from "recharts";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
  },
  countContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "20px",
  },
  card: {
    width: "30%",
    textAlign: "center",
    margin: "10px",
    boxShadow: "0px 0px 12px #3f51b5",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [leadCount, setLeadCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:100/api/counts`);
      const data = await response.json();
      setLeadCount(data.leadCount);
      setContactCount(data.contactCount);
      setServiceCount(data.serviceCount);
    }
    fetchData();
  }, []);

  const data1 = [
    { name: "Leads", value: leadCount },
    { name: "Others", value: 30 },
  ];
  const data2 = [
    { name: "Contacts", value: contactCount },
    { name: "Others", value: 30 },
  ];
  const data3 = [
    { name: "Service Requests", value: serviceCount },
    { name: "Others", value: 30 },
  ];

  const COLORS = ["#3f51b5", "#FFC107", "#FFBB28"];

  return (
    <div className={classes.dashboardContainer}>
      <AppBar position="static" style={{ color: "white" }}>
        <Toolbar style={{ color: "white" }}>
          <Link to="/"></Link>
          <div className={classes.header}>
            <Typography variant="h4">Dashboard</Typography>
          </div>
          <div className={classes.navLinks}>
            <Button component={Link} to="/leads">
              <Typography variant="h6">Leads</Typography>
            </Button>
            <Button component={Link} to="/contacts">
              <Typography variant="h6">Contacts</Typography>
            </Button>
            <Button component={Link} to="/service-request">
              <Typography variant="h6">Service Requests</Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>

      <div className={classes.countContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4">Leads</Typography>
            <br></br>
            <br></br>
            <Typography variant="h3">{leadCount}</Typography>
          </CardContent>
          <hr style={{ width: "80%" }} />
          <PieChart width={400} height={400}>
            <Pie
              data={data1}
              cx={160}
              cy={200}
              outerRadius={130}
              fill="#8884d8"
              label={({ value }) => (value === leadCount ? value : "")}
            >
              {data1.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4">Contacts</Typography>
            <br></br>
            <br></br>
            <Typography variant="h3">{contactCount}</Typography>
          </CardContent>
          <hr style={{ width: "80%" }} />
          <PieChart width={400} height={400}>
            <Pie
              data={data2}
              cx={160}
              cy={200}
              outerRadius={130}
              fill="#8884d7"
              label={({ value }) => (value === contactCount ? value : "")}
            >
              {data2.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4">Service Requests</Typography>
            <br></br>
            <br></br>
            <Typography variant="h3">{serviceCount}</Typography>
          </CardContent>
          <hr style={{ width: "80%" }} />
          <PieChart width={400} height={400}>
            <Pie
              data={data3}
              cx={160}
              cy={200}
              outerRadius={130}
              fill="#8884d7"
              label={({ value }) => (value === serviceCount ? value : "")}
            >
              {data3.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Card>
      </div>
      <div></div>
    </div>
  );
};
export default Dashboard;
