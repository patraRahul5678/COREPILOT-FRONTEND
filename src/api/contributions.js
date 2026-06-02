import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getContributionGraph = async (owner, repo) => {
  const response = await axios.get(`${API_URL}/api/contributions/graph`, {
    params: { owner, repo }
  });
  return response.data;
};
