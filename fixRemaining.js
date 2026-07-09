const fs = require('fs');

const files = [
    'c:/practice-Phanidhar/React-practice/src/components/admin/tournament-details/TournamentInfo.jsx',
    'c:/practice-Phanidhar/React-practice/src/components/admin/Tournaments/TournamentModal.jsx',
    'c:/practice-Phanidhar/React-practice/src/components/admin/Tournaments/TournamentsTable.jsx',
    'c:/practice-Phanidhar/React-practice/src/components/createTeam/PlayerCard.jsx',
    'c:/practice-Phanidhar/React-practice/src/components/MyTeamsCard.jsx',
    'c:/practice-Phanidhar/React-practice/src/components/Navbar.jsx',
    'c:/practice-Phanidhar/React-practice/src/pages/admin/TeamDetails.jsx',
    'c:/practice-Phanidhar/React-practice/src/pages/Dashboard.jsx',
    'c:/practice-Phanidhar/React-practice/src/pages/Leaderboard.jsx'
];

function toCamel(str) {
    return str.trim().replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
}

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix status-badge template literals
    content = content.replace(/className=\{\`(status-badge) \$\{([^}]+)\}\`\}/g, (match, p1, p2) => {
        return 'className={`${styles.statusBadge} ${styles[' + p2 + '] || \'\'}`}';
    });
    
    // Fix status template literals
    content = content.replace(/className=\{\`(status) \$\{([^}]+)\}\`\}/g, (match, p1, p2) => {
        return 'className={`${styles.status} ${styles[' + p2 + '] || \'\'}`}';
    });

    // Fix player-card conditional
    // className={`player-card ${selected ? "selected" : ""}`}
    content = content.replace(/className=\{\`player-card \$\{([^ ?]+) \? \"([^\"]+)\" : \"\"\}\`\}/g, (match, cond, cls) => {
        return 'className={`${styles.playerCard} ${' + cond + ' ? styles.' + toCamel(cls) + ' : \'\'}`}';
    });

    // Fix ternary className={isActive ? "active" : ""}
    content = content.replace(/className=\{([^ ?]+) \? \"([^\"]+)\" : \"\"\}/g, (match, cond, cls) => {
        return 'className={' + cond + ' ? styles.' + toCamel(cls) + ' : \'\'}';
    });
    
    // Fix ({ isActive }) => isActive ? "active" : ""
    content = content.replace(/className=\{\(\{\s*isActive\s*\}\)\s*=>\s*isActive\s*\?\s*\"([^\"]+)\"\s*:\s*\"\"\}/g, (match, cls) => {
        return 'className={({ isActive }) => isActive ? styles.' + toCamel(cls) + ' : \"\"}';
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed ' + file);
    }
}
