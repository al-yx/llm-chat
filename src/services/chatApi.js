const BASE_URL =
  "https://b6c46900-d12f-4aa3-9d66-b3e2ae586a10-00-2idqjgn7k5z9t.sisko.replit.dev/";

const ROUTES = {
  GET_MODELS: `${BASE_URL}/models`,
  STREAM_ANSWER: `${BASE_URL}/streamanswer`,
};

const getModels = async () => {
  try {
    const response = await fetch(ROUTES.GET_MODELS);
    const data = await response.json();
    return data.models;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const streamAnswer = async (modelName, question) => {
  try {
    const response = await fetch(
      `${ROUTES.STREAM_ANSWER}/?modelName=${modelName}&question=${question}`
    );
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default {
  getModels,
  streamAnswer,
};
