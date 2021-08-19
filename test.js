import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [{ duration: '15s', target: 500 }],
};

export default function () {
  const domain = 'http://localhost:3001/api/qa/';
  const productId = Math.floor(Math.random() * 3000000);
  let res = http.get(`${domain}questions?product_id=${productId}`);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'is duration < 50': (r) => r.timings.duration < 50,
  });

  res = http.get(`${domain}questions/${productId}/answers`);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'is duration < 50': (r) => r.timings.duration < 50,
  });
}
