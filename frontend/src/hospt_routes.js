import Ambulance from "layouts/ambulance";
import Blood from "layouts/bloodbank";
import Doctors from "layouts/doctors";
import Patients from "layouts/patients";
import Empty_Slots from "layouts/empty_slots";
import HospitalDashboard from "layouts/hospitaldashboard";
import Logout from "layouts/authentication/logout";

import Icon from "@mui/material/Icon";

const hospital_routes = [
  {
    type: "collapse",
    name: "Hospital Dashboard",
    key: "hospitaldashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/hospitaldashboard",
    component: <HospitalDashboard />,
    layout: "hosp_dash",
  },
  {
    type: "collapse",
    name: "Empty Slots",
    key: "empty_slots",
    icon: <Icon fontSize="small">event_available</Icon>,
    route: "/empty_slots",
    component: <Empty_Slots />,
    layout: "hosp_dash",
  },
  {
    type: "collapse",
    name: "Patients",
    key: "patients",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/patients",
    component: <Patients />,
    layout: "hosp_dash", // fixed
  },
  {
    type: "collapse",
    name: "Doctors",
    key: "doctors",
    icon: <Icon fontSize="small">medical_services</Icon>,
    route: "/doctors",
    component: <Doctors />,
    layout: "hosp_dash",
  },
  {
    type: "collapse",
    name: "Ambulance",
    key: "ambulance",
    icon: <Icon fontSize="small">local_shipping</Icon>,
    route: "/ambulance",
    component: <Ambulance />,
    layout: "hosp_dash",
  },
  {
    type: "collapse",
    name: "Blood Bank",
    key: "bloodbank",
    icon: <Icon fontSize="small">bloodtype</Icon>,
    route: "/bloodbank",
    component: <Blood />,
    layout: "hosp_dash",
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small" style={{ color: "red" }}>logout</Icon>,
    route: "/logout",
    component: <Logout />,
    color: "error", // This uses the theme's error color (red)
  }
];

export default hospital_routes;
