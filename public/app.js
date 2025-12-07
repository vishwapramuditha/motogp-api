const API_BASE = window.location.origin + '/api';
const API_KEY = 'demo-key';

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

async function loadDashboard() {
    const content = document.getElementById('dynamic-content');
    content.innerHTML = '<div class="card">Loading Dashboard...</div>';

    try {
        // Updated to use ?api_key=
        const [schedule, standings, riders] = await Promise.all([
            fetch(`${API_BASE}/schedule?api_key=${API_KEY}`).then(r => r.json()),
            fetch(`${API_BASE}/standings?api_key=${API_KEY}`).then(r => r.json()),
            fetch(`${API_BASE}/riders?api_key=${API_KEY}`).then(r => r.json())
        ]);

        const nextRace = schedule.find(r => new Date(r.date) > new Date()) || schedule[0]; // Fallback if season done
        const topRider = standings.riders_championship[0];

        content.innerHTML = `
            <div class="hero-card">
                <img src="images/hero.png" alt="MotoGP">
                <div class="hero-overlay">
                    <h1>MotoGP Developer Hub</h1>
                    <p>Your source for open racing data.</p>
                </div>
            </div>

            <div class="dashboard-grid">
                <!-- Next Race Card -->
                <div class="stat-card">
                    <h3>Next Grand Prix</h3>
                    <div class="big-stat">${nextRace.grand_prix}</div>
                    <div class="stat-detail">📍 ${nextRace.circuit}</div>
                    <div class="stat-detail">📅 ${new Date(nextRace.date).toLocaleDateString()}</div>
                    <div class="countdown-timer">
                        <!-- Placeholder for countdown logic -->
                        <div class="time-unit"><span class="time-val">04</span><span class="time-label">DAYS</span></div>
                        <div class="time-unit"><span class="time-val">12</span><span class="time-label">HRS</span></div>
                    </div>
                </div>

                <!-- Championship Leader -->
                <div class="stat-card">
                    <h3>Championship Leader</h3>
                    <div class="big-stat">#${topRider.position} ${topRider.rider}</div>
                    <div class="stat-detail">🏆 ${topRider.points} Points</div>
                    <div class="stat-detail">Ducati Lenovo Team</div>
                </div>

                 <!-- API Health -->
                <div class="stat-card">
                    <h3>API Status</h3>
                    <div class="big-stat" style="color: #137333;">Operational</div>
                    <div class="stat-detail">GET /riders 200 OK</div>
                    <div class="stat-detail">GET /tracks 200 OK</div>
                </div>
            </div>
        `;
    } catch (e) {
        content.innerHTML = `<div class="card error">Error loading dashboard: ${e.message}</div>`;
    }
}

async function loadResource(resource) {
    const content = document.getElementById('dynamic-content');
    content.innerHTML = '<div class="card">Loading...</div>';

    // Update styling for active link
    document.querySelectorAll('.sidebar a').forEach(a => a.parentElement.classList.remove('active'));
    // (Optional: Logic to highlight current link)

    try {
        const res = await fetch(`${API_BASE}/${resource}?api_key=${API_KEY}`);
        const data = await res.json();

        let html = `
            <div class="view-toggle">
                <button class="toggle-btn active" onclick="toggleView('visual')">Visual</button>
                <button class="toggle-btn" onclick="toggleView('json')">JSON</button>
            </div>
            
            <div id="visual-view" class="visual-view table-container">
                ${generateTable(data, resource)}
            </div>

            <div id="json-view" class="json-view">
                <div class="api-example">
                    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
                </div>
            </div>
        `;
        content.innerHTML = `<h2>${resource.toUpperCase()}</h2>` + html;

    } catch (e) {
        content.innerHTML = `Error: ${e.message}`;
    }
}

function generateTable(data, resource) {
    if (!data || data.length === 0) return 'No data available';

    // Handle special case for standings object
    if (resource === 'standings') {
        data = data.riders_championship; // Default to riders for table
    }

    const headers = Object.keys(data[0]);

    let table = '<table><thead><tr>';
    headers.forEach(h => table += `<th>${h}</th>`);
    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += '<tr>';
        headers.forEach(h => {
            let val = row[h];
            if (typeof val === 'object') val = JSON.stringify(val);
            table += `<td>${val}</td>`;
        });
        table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
}

function toggleView(view) {
    const visual = document.getElementById('visual-view');
    const json = document.getElementById('json-view');
    const btns = document.querySelectorAll('.toggle-btn');

    if (view === 'json') {
        visual.classList.add('hide');
        json.classList.add('show');
        btns[1].classList.add('active');
        btns[0].classList.remove('active');
    } else {
        visual.classList.remove('hide');
        json.classList.remove('show');
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    }
}
