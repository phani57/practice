const fs = require('fs');

function toCamel(str) {
    return str.replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
}

function processFile(file, importCss) {
    let content = fs.readFileSync(file, 'utf8');
    
    // add import if missing
    if (!content.includes('import styles from')) {
        content = `import styles from "${importCss}";\n` + content;
    }

    // replace static className="..."
    content = content.replace(/className=\"([^\"]+)\"/g, (match, classes) => {
        if (!classes.trim()) return match;
        const classArray = classes.split(/\s+/).filter(Boolean);
        if (classArray.length === 1) return 'className={styles.' + toCamel(classArray[0]) + '}';
        return 'className={`' + classArray.map(c => '${styles.' + toCamel(c) + '}').join(' ') + '`}';
    });

    // specific replacement for TournamentsTable status
    content = content.replace(/className=\{\`status \$\{\s*tournament\.status === \"Live\"\s*\? \"live\"\s*: tournament\.status === \"Upcoming\"\s*\? \"upcoming\"\s*: \"completed\"\s*\}\`\}/g, 
        'className={`${styles.status} ${ tournament.status === "Live" ? styles.live : tournament.status === "Upcoming" ? styles.upcoming : styles.completed }`}');

    // specific replacement for TournamentInfo status
    content = content.replace(/className=\{\`status-badge \$\{tournament\.status\.toLowerCase\(\)\}\`\}/g,
        'className={`${styles.statusBadge} ${styles[tournament.status.toLowerCase()] || \'\'}`}');

    fs.writeFileSync(file, content);
}

processFile('c:/practice-Phanidhar/React-practice/src/components/admin/Tournaments/TournamentsTable.jsx', '../../../styles/admin/AdminTournaments.module.css');
processFile('c:/practice-Phanidhar/React-practice/src/components/admin/tournament-details/TournamentInfo.jsx', '../../../styles/admin/TournamentDetails.module.css');
