// ===== DATA GENERATION =====
const TODAY = new Date(2026, 3, 21);
function dateLabel(d) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randF(min, max) { return +(Math.random() * (max - min) + min).toFixed(1); }

// Generate 30-day datasets
const data30 = [];
for (let i = 29; i >= 0; i--) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - i);
  data30.push({
    date: d,
    label: dateLabel(d),
    steps: i === 0 ? 8432 : rand(4200, 13500),
    water: i === 0 ? 2.5 : randF(1.2, 4.0),
    sleep: i === 0 ? 7.5 : randF(5.5, 9.2),
    expenses: i === 0 ? 45 : rand(8, 120)
  });
}

const currentData = data30[data30.length - 1];

// Compute % changes vs previous day
function pctChange(arr, key) {
  const curr = arr[arr.length - 1][key];
  const prev = arr[arr.length - 2][key];
  const pct = ((curr - prev) / prev * 100).toFixed(0);
  return { pct: Math.abs(pct), dir: pct >= 0 ? 'up' : 'down' };
}

// ===== STATE =====
let timeframe = 7;
let activeMetrics = new Set(['steps', 'water', 'sleep', 'expenses']);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initCards();
  initControls();
  renderAll();
  drawSparklines();
});

// ===== CARDS =====
function initCards() {
  const cards = [
    { metric: 'steps', value: currentData.steps.toLocaleString(), label: 'Steps Today', icon: '👟' },
    { metric: 'water', value: currentData.water + ' L', label: 'Water Intake', icon: '💧' },
    { metric: 'sleep', value: currentData.sleep + ' hrs', label: 'Sleep Duration', icon: '🌙' },
    { metric: 'expenses', value: '$' + currentData.expenses, label: 'Daily Expenses', icon: '💳' }
  ];
  const container = document.getElementById('summaryCards');
  cards.forEach(c => {
    const ch = pctChange(data30, c.metric);
    const card = document.createElement('div');
    card.className = 'summary-card';
    card.dataset.metric = c.metric;
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${c.icon}</div>
        <div class="card-change ${ch.dir}">
          ${ch.dir === 'up' ? '↑' : '↓'} ${ch.pct}%
        </div>
      </div>
      <div class="card-value">${c.value}</div>
      <div class="card-label">${c.label}</div>
      <div class="sparkline-container" id="spark-${c.metric}"></div>
    `;
    card.addEventListener('click', () => {
      card.classList.add('highlight');
      setTimeout(() => card.classList.remove('highlight'), 600);
    });
    container.appendChild(card);
  });
}

// ===== CONTROLS =====
function initControls() {
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      timeframe = parseInt(btn.dataset.days);
      renderAll();
    });
  });
  document.querySelectorAll('.metric-chip').forEach(chip => {
    chip.classList.add('active');
    chip.addEventListener('click', () => {
      const m = chip.dataset.metric;
      if (activeMetrics.has(m)) { activeMetrics.delete(m); chip.classList.remove('active'); }
      else { activeMetrics.add(m); chip.classList.add('active'); }
      renderAll();
    });
  });
}

// ===== SPARKLINES =====
function drawSparklines() {
  ['steps','water','sleep','expenses'].forEach(metric => {
    const el = document.getElementById('spark-' + metric);
    if (!el) return;
    const w = el.clientWidth || 200, h = 36;
    const vals = data30.slice(-7).map(d => d[metric]);
    const svg = d3.select(el).append('svg').attr('width', w).attr('height', h);
    const x = d3.scaleLinear().domain([0, vals.length - 1]).range([0, w]);
    const y = d3.scaleLinear().domain([d3.min(vals) * 0.9, d3.max(vals) * 1.1]).range([h - 2, 2]);
    const colors = { steps: '#4fc3f7', water: '#29b6f6', sleep: '#ab47bc', expenses: '#66bb6a' };
    const area = d3.area().x((_, i) => x(i)).y0(h).y1((d) => y(d)).curve(d3.curveMonotoneX);
    const line = d3.line().x((_, i) => x(i)).y(d => y(d)).curve(d3.curveMonotoneX);
    svg.append('path').datum(vals).attr('d', area).attr('fill', colors[metric]).attr('opacity', 0.15);
    svg.append('path').datum(vals).attr('d', line).attr('fill', 'none').attr('stroke', colors[metric]).attr('stroke-width', 2);
  });
}

// ===== RENDER ALL CHARTS =====
function renderAll() {
  const slice = data30.slice(-timeframe);
  const chartsGrid = document.getElementById('chartsGrid');
  chartsGrid.innerHTML = '';

  if (activeMetrics.size === 0) {
    chartsGrid.innerHTML = '<div class="chart-card full-width"><div class="no-data-msg">Select a metric above to view charts</div></div>';
    return;
  }

  if (activeMetrics.has('steps')) {
    const card = makeChartCard('Weekly Steps', 'Daily step count', 'stepsChart');
    chartsGrid.appendChild(card);
    setTimeout(() => drawBarChart('stepsChart', slice, 'steps', '#4fc3f7'), 10);
  }

  // Combined line chart for wellness metrics
  const wellnessMetrics = ['water', 'sleep'].filter(m => activeMetrics.has(m));
  if (wellnessMetrics.length > 0) {
    const card = makeChartCard('Wellness Trends', 'Sleep & Water intake', 'wellnessChart', wellnessMetrics);
    chartsGrid.appendChild(card);
    setTimeout(() => drawLineChart('wellnessChart', slice, wellnessMetrics), 10);
  }

  if (activeMetrics.has('expenses')) {
    const card = makeChartCard('Expense Tracking', 'Daily spending trend', 'expenseChart');
    chartsGrid.appendChild(card);
    setTimeout(() => drawExpenseChart('expenseChart', slice), 10);
  }
}

function makeChartCard(title, subtitle, id, legendMetrics) {
  const card = document.createElement('div');
  card.className = 'chart-card' + (id === 'stepsChart' ? ' full-width' : '');
  let legendHTML = '';
  if (legendMetrics && legendMetrics.length > 1) {
    const colors = { water: '#29b6f6', sleep: '#ab47bc', expenses: '#66bb6a' };
    const labels = { water: 'Water (L)', sleep: 'Sleep (hrs)', expenses: 'Expenses ($)' };
    legendHTML = '<div class="chart-legend">' + legendMetrics.map(m =>
      `<div class="legend-item"><div class="legend-color" style="background:${colors[m]}"></div>${labels[m]}</div>`
    ).join('') + '</div>';
  }
  card.innerHTML = `
    <div class="chart-title">${title}</div>
    <div class="chart-subtitle">${subtitle}</div>
    ${legendHTML}
    <div class="chart-container" id="${id}"></div>
  `;
  return card;
}

// ===== TOOLTIP HELPER =====
function showTooltip(container, x, y, date, value, label, color) {
  let tt = container.querySelector('.chart-tooltip');
  if (!tt) { tt = document.createElement('div'); tt.className = 'chart-tooltip'; container.appendChild(tt); }
  tt.innerHTML = `<div class="tt-date">${date}</div><div class="tt-value" style="color:${color}">${value}</div><div style="font-size:11px;color:#9fa8da">${label}</div>`;
  tt.style.opacity = 1;
  const rect = container.getBoundingClientRect();
  tt.style.left = Math.min(x + 12, rect.width - 130) + 'px';
  tt.style.top = (y - 60) + 'px';
}

function hideTooltip(container) {
  const tt = container.querySelector('.chart-tooltip');
  if (tt) tt.style.opacity = 0;
}

// ===== BAR CHART (Steps) =====
function drawBarChart(containerId, data, key, color) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const margin = { top: 10, right: 20, bottom: 40, left: 50 };
  const w = container.clientWidth - margin.left - margin.right;
  const h = 220 - margin.top - margin.bottom;

  const svg = d3.select('#' + containerId).append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Gradients
  const defs = svg.append('defs');
  const grad = defs.append('linearGradient').attr('id', 'barGrad').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
  grad.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 1);
  grad.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0.4);

  const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, w]).padding(0.35);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d[key]) * 1.15]).range([h, 0]);

  // Grid
  svg.append('g').attr('class', 'grid').call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(''));

  // Axes
  svg.append('g').attr('class', 'axis').attr('transform', `translate(0,${h})`).call(d3.axisBottom(x))
    .selectAll('text').attr('transform', 'rotate(-35)').style('text-anchor', 'end');
  svg.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(5).tickFormat(d => d >= 1000 ? (d/1000)+'k' : d));

  // Bars with animation
  svg.selectAll('.bar-steps').data(data).enter().append('rect')
    .attr('class', 'bar-steps')
    .attr('x', d => x(d.label)).attr('width', x.bandwidth())
    .attr('y', h).attr('height', 0).attr('fill', 'url(#barGrad)').attr('rx', 4)
    .on('mouseover', function(event, d) {
      d3.select(this).attr('opacity', 0.8);
      showTooltip(container, event.offsetX, event.offsetY, d.label, d[key].toLocaleString() + ' steps', 'Daily Steps', color);
    })
    .on('mouseout', function() {
      d3.select(this).attr('opacity', 1);
      hideTooltip(container);
    })
    .transition().duration(600).delay((_, i) => i * 40)
    .attr('y', d => y(d[key])).attr('height', d => h - y(d[key]));
}

// ===== LINE CHART (Wellness) =====
function drawLineChart(containerId, data, metrics) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const margin = { top: 10, right: 20, bottom: 40, left: 45 };
  const w = container.clientWidth - margin.left - margin.right;
  const h = 220 - margin.top - margin.bottom;

  const svg = d3.select('#' + containerId).append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const colors = { water: '#29b6f6', sleep: '#ab47bc' };
  const units = { water: ' L', sleep: ' hrs' };
  const labels = { water: 'Water Intake', sleep: 'Sleep Duration' };

  const defs = svg.append('defs');
  metrics.forEach(m => {
    const g = defs.append('linearGradient').attr('id', m + 'Grad').attr('x1','0').attr('y1','0').attr('x2','0').attr('y2','1');
    g.append('stop').attr('offset','0%').attr('stop-color', colors[m]).attr('stop-opacity', 0.3);
    g.append('stop').attr('offset','100%').attr('stop-color', colors[m]).attr('stop-opacity', 0);
  });

  const x = d3.scalePoint().domain(data.map(d => d.label)).range([0, w]).padding(0.5);

  // Compute combined domain
  let allVals = [];
  metrics.forEach(m => data.forEach(d => allVals.push(d[m])));
  const y = d3.scaleLinear().domain([Math.min(0, d3.min(allVals) * 0.8), d3.max(allVals) * 1.2]).range([h, 0]);

  svg.append('g').attr('class', 'grid').call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(''));
  svg.append('g').attr('class', 'axis').attr('transform', `translate(0,${h})`).call(d3.axisBottom(x))
    .selectAll('text').attr('transform', 'rotate(-35)').style('text-anchor', 'end');
  svg.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(5));

  metrics.forEach(m => {
    const area = d3.area().x(d => x(d.label)).y0(h).y1(d => y(d[m])).curve(d3.curveMonotoneX);
    const line = d3.line().x(d => x(d.label)).y(d => y(d[m])).curve(d3.curveMonotoneX);

    svg.append('path').datum(data).attr('d', area).attr('fill', `url(#${m}Grad)`);

    const path = svg.append('path').datum(data).attr('d', line)
      .attr('fill', 'none').attr('stroke', colors[m]).attr('stroke-width', 2.5);

    const totalLen = path.node().getTotalLength();
    path.attr('stroke-dasharray', totalLen).attr('stroke-dashoffset', totalLen)
      .transition().duration(800).attr('stroke-dashoffset', 0);

    svg.selectAll('.dot-' + m).data(data).enter().append('circle')
      .attr('class', 'data-dot').attr('cx', d => x(d.label)).attr('cy', d => y(d[m]))
      .attr('r', 4).attr('fill', colors[m]).attr('stroke', '#1e2a4a')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 6);
        showTooltip(container, event.offsetX, event.offsetY, d.label, d[m] + units[m], labels[m], colors[m]);
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
        hideTooltip(container);
      });
  });
}

// ===== EXPENSE CHART =====
function drawExpenseChart(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const margin = { top: 10, right: 20, bottom: 40, left: 50 };
  const w = container.clientWidth - margin.left - margin.right;
  const h = 220 - margin.top - margin.bottom;
  const color = '#66bb6a';

  const svg = d3.select('#' + containerId).append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const defs = svg.append('defs');
  const g = defs.append('linearGradient').attr('id','expAreaGrad').attr('x1','0').attr('y1','0').attr('x2','0').attr('y2','1');
  g.append('stop').attr('offset','0%').attr('stop-color', color).attr('stop-opacity', 0.3);
  g.append('stop').attr('offset','100%').attr('stop-color', color).attr('stop-opacity', 0);

  const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, w]).padding(0.4);
  const xLine = d3.scalePoint().domain(data.map(d => d.label)).range([x.bandwidth()/2, w - x.bandwidth()/2]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.expenses) * 1.2]).range([h, 0]);

  svg.append('g').attr('class', 'grid').call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(''));
  svg.append('g').attr('class', 'axis').attr('transform', `translate(0,${h})`).call(d3.axisBottom(x))
    .selectAll('text').attr('transform', 'rotate(-35)').style('text-anchor', 'end');
  svg.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(5).tickFormat(d => '$' + d));

  // Bars
  svg.selectAll('.bar-exp').data(data).enter().append('rect')
    .attr('x', d => x(d.label)).attr('width', x.bandwidth())
    .attr('y', h).attr('height', 0)
    .attr('fill', color).attr('opacity', 0.3).attr('rx', 3)
    .on('mouseover', function(event, d) {
      d3.select(this).attr('opacity', 0.5);
      showTooltip(container, event.offsetX, event.offsetY, d.label, '$' + d.expenses, 'Daily Expense', color);
    })
    .on('mouseout', function() { d3.select(this).attr('opacity', 0.3); hideTooltip(container); })
    .transition().duration(600).delay((_, i) => i * 30)
    .attr('y', d => y(d.expenses)).attr('height', d => h - y(d.expenses));

  // Trend line
  const line = d3.line().x(d => xLine(d.label)).y(d => y(d.expenses)).curve(d3.curveMonotoneX);
  const path = svg.append('path').datum(data).attr('d', line)
    .attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.5);
  const totalLen = path.node().getTotalLength();
  path.attr('stroke-dasharray', totalLen).attr('stroke-dashoffset', totalLen)
    .transition().duration(800).attr('stroke-dashoffset', 0);

  // Dots
  svg.selectAll('.dot-exp').data(data).enter().append('circle')
    .attr('class', 'data-dot').attr('cx', d => xLine(d.label)).attr('cy', d => y(d.expenses))
    .attr('r', 4).attr('fill', color).attr('stroke', '#1e2a4a')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('r', 6);
      showTooltip(container, event.offsetX, event.offsetY, d.label, '$' + d.expenses, 'Daily Expense', color);
    })
    .on('mouseout', function() { d3.select(this).attr('r', 4); hideTooltip(container); });
}
