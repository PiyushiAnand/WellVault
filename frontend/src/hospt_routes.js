import Ambulance from "layouts/ambulance";
import Blood from "layouts/bloodbank";
import Doctor from "layouts/doctors";
import Patients from "layouts/patients";
import Empty_Slots from "layouts/empty_slots";
import HospitalDashboard from "layouts/hospitaldashboard";

import Icon from "@mui/material/Icon";

const hospital_routes = [
//   {
//     type: "collapse",
//     name: "Hospital Dashboard",
//     key: "hospitaldashboard",
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: "/hospitaldashboard",
//     component: <HospitalDashboard />,
//     layout: "hosp_dash",
//   },
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
    component: <Doctor />,
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
    key: "blood",
    icon: <Icon fontSize="small">bloodtype</Icon>,
    route: "/blood",
    component: <Blood />,
    layout: "hosp_dash",
  },
];

export default hospital_routes;
