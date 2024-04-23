const ACTIVITY_API_URL = "https://www.boredapi.com";
const ACTIVITY_PATH = "/api/activity";

type ActivitiesJsonResponse = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
};

const getInitRequest = (httpVerb: string): RequestInit => {
  const init: RequestInit = {
    method: httpVerb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return init;
};

export const getActivities = async (
  totalActivities: string
): Promise<string> => {
  let activities: string = "";

  const request: RequestInfo = `${ACTIVITY_API_URL}${ACTIVITY_PATH}?number=${totalActivities}`;
  const response = await fetch(request, getInitRequest("GET"));
  const json: ActivitiesJsonResponse = await response.json();

  if (json != null) {
    activities = json.activity;
  }

  return activities;
};
