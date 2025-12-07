const API_BASE = 'api';

// Fallback Data for when fetch fails (e.g., file:// protocol)
const FALLBACK_DATA = {
    schedule: [
        { round: 1, grand_prix: "Grand Prix of Qatar", circuit: "Lusail International Circuit", date: "2024-03-10", country: "Qatar" },
        { round: 2, grand_prix: "Grand Prix of Portugal", circuit: "Autodromo Internacional do Algarve", date: "2024-03-24", country: "Portugal" }
    ],
    riders: [
        { id: 1, name: "Francesco Bagnaia", number: 63, team: "Ducati Lenovo Team", country: "Italy", bike: "Ducati" },
        { id: 2, name: "Fabio Quartararo", number: 20, team: "Monster Energy Yamaha MotoGP", country: "France", bike: "Yamaha" }
    ],
    standings: {
        riders_championship: [{ position: 1, rider: "Francesco Bagnaia", points: 25 }, { position: 2, rider: "Brad Binder", points: 20 }]
    },
    teams: [
        { name: "Ducati Lenovo Team", manufacturer: "Ducati" },
        { name: "Monster Energy Yamaha MotoGP", manufacturer: "Yamaha" }
    ],
    tracks: [
        { name: "Lusail International Circuit", country: "Qatar", length_km: 5.38 },
        { name: "Autodromo Internacional do Algarve", country: "Portugal", length_km: 4.59 }
    ]
};

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    checkProtocol();
    loadDashboard();
});

function checkProtocol() {
    if (window.location.protocol === 'file:') {
        const toast = document.createElement('div');
        toast.className = 'toast warning';
        toast.innerHTML = `
            <strong>⚠️ Demo Mode Active</strong>
            <p>You are viewing this file locally. Live data fetching is disabled by browser security. Showing backup data.</p>
        `;
        document.body.appendChild(toast);
    }
}

async function fetchData(resource) {
    try {
        if (window.location.protocol === 'file:') throw new Error('File protocol literal');

        const res = await fetch(`${API_BASE}/${resource}.json`);
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    } catch (e) {
        console.warn(`Fetch failed for ${resource}, using fallback.`, e);
        // Return fallback data if available
        return FALLBACK_DATA[resource] || [];
    }
}

async function loadDashboard() {
    const content = document.getElementById('dynamic-content');
    content.innerHTML = '<div class="card loading-card">Loading Dashboard...</div>';

    try {
        const [schedule, standings, riders] = await Promise.all([
            fetchData('schedule'),
            fetchData('standings'),
            fetchData('riders')
        ]);

        const nextRace = schedule.find(r => new Date(r.date) > new Date()) || schedule[0];
        const topRider = standings.riders_championship ? standings.riders_championship[0] : standings[0];

        content.innerHTML = `
            <div class="hero-card fadeIn">
                <img src="images/hero.png" alt="MotoGP">
                <div class="hero-overlay">
                    <h1>MotoGP Developer Hub</h1>
                    <p>Build the future of racing apps with our open API.</p>
                </div>
            </div>

            <div class="dashboard-grid fadeIn" style="animation-delay: 0.1s">
                <div class="stat-card glass-card">
                    <h3>Next Grand Prix</h3>
                    <div class="big-stat">${nextRace.grand_prix}</div>
                    <div class="stat-detail">📍 ${nextRace.circuit}</div>
                    <div class="stat-detail">📅 ${new Date(nextRace.date).toLocaleDateString()}</div>
                </div>

                <div class="stat-card glass-card">
                    <h3>Championship Leader</h3>
                    <div class="big-stat">#${topRider.position || '?'} ${topRider.rider || 'Unknown'}</div>
                    <div class="stat-detail">🏆 ${topRider.points} Points</div>
                </div>

                <div class="stat-card glass-card">
                    <h3>System Status</h3>
                    <div class="big-stat" style="color: #137333;">Operational</div>
                    <div class="stat-detail">Static Data Ready</div>
                </div>
            </div>
        `;
    } catch (e) {
        content.innerHTML = `<div class="card error-card"><h3>Dashboard Error</h3><p>${e.message}</p></div>`;
    }
}

async function loadResource(resource) {
    const content = document.getElementById('dynamic-content');
    content.innerHTML = '<div class="card loading-card">Fetching Data...</div>';

    document.querySelectorAll('.sidebar a').forEach(a => a.parentElement.classList.remove('active'));

    try {
        const data = await fetchData(resource);

        let html = `
            <div class="view-toggle fadeIn">
                <button class="toggle-btn active" onclick="toggleView('visual')">Visual</button>
                <button class="toggle-btn" onclick="toggleView('json')">JSON</button>
            </div>
            
            <div id="visual-view" class="visual-view table-container fadeIn">
                ${generateTable(data, resource)}
            </div>

            <div id="json-view" class="json-view fadeIn">
                <div class="api-example">
                    <div class="code-header">
                        <span class="method">GET</span> /api/${resource}.json
                    </div>
                    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
                </div>
            </div>
        `;
        content.innerHTML = `<h2>${resource.toUpperCase()}</h2>` + html;

    } catch (e) {
        content.innerHTML = `<div class="card error-card"><h3>Error</h3><p>${e.message}</p></div>`;
    }
}

function generateTable(data, resource) {
    if (!data || data.length === 0) return '<div class="empty-state">No data available</div>';
    if (resource === 'standings') data = data.riders_championship;

    // Safety check if data is not an array after adjustment
    if (!Array.isArray(data)) return '<div class="empty-state">Invalid data format</div>';

    const headers = Object.keys(data[0]);

    let table = '<table><thead><tr>';
    headers.forEach(h => table += `<th>${h.replace(/_/g, ' ')}</th>`);
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
