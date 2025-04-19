import { Router } from "express";
import {
  sendAnalytics,
  trackAction,
  trackingScript,
  sendSites,
  sendSite,
  sendDashboardData,
  authCheck,
} from "./handlers";

const router = Router();
const apiRoutes = Router();

router.post("/track", trackAction);
router.get("/scripts/tracker", trackingScript);

// STUDIO APIs
apiRoutes.get("/analytics", sendAnalytics);
apiRoutes.get("/dashboard", sendDashboardData);
apiRoutes.get("/sites", sendSites);
apiRoutes.get("/site/:channelId", sendSite);

apiRoutes.get("/check", authCheck);

export { router, apiRoutes };
