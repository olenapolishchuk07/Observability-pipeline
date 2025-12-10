const express = require('express');
const client = require('prom-client');

const app = express();
const register = client.register;

// Створюємо просту метрику CPU (як приклад)
const counter = new client.Counter({
  name: 'node_requests_total',
  help: 'Total number of requests'
});

// Endpoint для Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Лічильник для всіх запитів
app.get('/', (req, res) => {
  counter.inc(); // збільшуємо лічильник
  res.send('Hello Observability!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
