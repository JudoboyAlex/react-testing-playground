import React, { useState, useEffect } from "react";
import WorkOrdersDisplay from "./components/WorkOrdersDisplay";
import axios from "axios";
import moment from "moment";
import "./App.css";
import "normalize.css";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const App = () => {
  const [workData, setWorkData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [state, setState] = useState({
    checkedA: false,
  });

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  const getWorkData = async () => {
    const orders = await axios.get(
      "https://api.hatchways.io/assessment/work_orders"
    );
    const workersData = await Promise.all(
      orders.data.orders.map(async (res) => {
        const workers = await axios.get(
          `https://api.hatchways.io/assessment/workers/${res.workerId}`
        );
        return workers.data;
      })
    );
    const ordersInfo = orders.data.orders;
    const completeWorkOrdersInfo = workersData
      .map((x) => x.worker)
      .map((x, i) => {
        let { id, name, ...rest } = x;
        return { ...rest, worker_id: id, workerName: name, ...ordersInfo[i] };
      });
    const sortedWorkOrdersInfo = completeWorkOrdersInfo.sort(
      (a, b) => a.deadline - b.deadline
    );
    if (searchName.length > 0) {
      const nameSearchResult = sortedWorkOrdersInfo.filter((name) =>
        name.workerName.toLowerCase().includes(searchName)
      );
      setWorkData(nameSearchResult);
    } else {
      setWorkData(sortedWorkOrdersInfo);
    }
  };

  useEffect(() => {
    getWorkData();
  }, [searchName]);

  const handleChangeInput = (event) => {
    setSearchName(event.target.value.toLowerCase());
    getWorkData();
  };

  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    const newWorkData = [...workData];
    const reversedWorkOrdersInfo = newWorkData.reverse();
    setWorkData(reversedWorkOrdersInfo);
  };

  if (workData) {
    return (
      <div>
        <div>
          <form>
            <input
              type="text"
              id="name-input"
              value={searchName}
              onChange={handleChangeInput}
              name="workerName"
              placeholder="Filter by worker name..."
            />
          </form>
        </div>
        <div className="formContainer">
          <FormGroup>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Earliest First</Grid>
                <Grid item>
                  <AntSwitch
                    id="deadline-input"
                    checked={state.checkedA}
                    onChange={handleChangeSwitch}
                    name="checkedA"
                  />
                </Grid>
                <Grid item>Latest First</Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </div>
        <div className="workOrdersProfileContainer">
          {workData.map((work) => (
            <WorkOrdersDisplay
              key={work.id}
              id={work.id}
              companyName={work.companyName}
              workerName={work.workerName}
              name={work.name}
              deadline={moment
                .unix(work.deadline)
                .format("MMMM Do YYYY, h:mm:ss a")}
              description={work.description}
              photo={work.image}
              email={work.email}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default App;
