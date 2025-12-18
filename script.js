let servers = [];

function renderInventory() {
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.innerHTML = '';
    servers.forEach((server, index) => {
        const serverDiv = document.createElement('div');
        serverDiv.innerHTML = `
            ${server.name} - ${server.ip}
            <button onclick="modifyServer(${index})">Modify</button>
            <button onclick="deleteServer(${index})">Delete</button>
        `;
        inventoryDiv.appendChild(serverDiv);
    });
}

if (localStorage.getItem('servers')) {
    servers = JSON.parse(localStorage.getItem('servers'));
    renderInventory();
}

document.getElementById('addServerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('serverName').value;
    const ip = document.getElementById('serverIP').value;
    if (name && ip) {
        servers.push({ name, ip });
        localStorage.setItem('servers', JSON.stringify(servers));
        renderInventory();
        document.getElementById('serverName').value = '';
        document.getElementById('serverIP').value = '';
    }
});

function modifyServer(index) {
    const name = prompt("Enter new server name:", servers[index].name);
    const ip = prompt("Enter new server IP:", servers[index].ip);
    if (name && ip) {
        servers[index].name = name;
        servers[index].ip = ip;
        localStorage.setItem('servers', JSON.stringify(servers));
        renderInventory();
    }
}

function deleteServer(index) {
    if (confirm("Are you sure you want to delete this server?")) {
        servers.splice(index, 1);
        localStorage.setItem('servers', JSON.stringify(servers));
        renderInventory();
    }
}
