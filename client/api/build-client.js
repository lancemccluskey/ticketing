import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      //baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      baseURL: 'http://www.tlmengineering.com/',
      headers: req.headers
    });
  } else {
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;
