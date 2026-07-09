import fs from 'fs';
import path from 'path';

const files = [
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\dashboard\\DashboardHeader.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\dashboard\\LiveMatches.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\dashboard\\StatCard.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\dashboard\\StatsGrid.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\dashboard\\UpcomingMatches.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\players\\PlayerModal.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\players\\PlayerRow.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\players\\PlayersHeader.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\players\\PlayersTable.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\players\\PlayersToolbar.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Teams\\TeamModal.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Teams\\TeamsHeader.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Teams\\TeamsTable.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Teams\\TeamsToolbar.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\tournament-details\\MatchesTable.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\tournament-details\\MatchForm.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\tournament-details\\TournamentInfo.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Tournaments\\TournamentModal.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Tournaments\\TournamentsHeader.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Tournaments\\TournamentsTable.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\admin\\Tournaments\\TournamentsToolbar.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\createTeam\\PlayerCard.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\createTeam\\TeamColumn.jsx',
    'c:\\practice-Phanidhar\\React-practice\\src\\components\\createTeam\\TeamSummary.jsx'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let importPath = '';
    
    if (file.includes('\\admin\\dashboard\\')) {
        importPath = '../../../styles/admin/Dashboard.module.css';
    } else if (file.includes('\\admin\\players\\')) {
        importPath = '../../../styles/admin/Players.module.css';
    } else if (file.includes('\\admin\\Teams\\')) {
        importPath = '../../../styles/admin/Teams.module.css';
    } else if (file.includes('\\admin\\tournament-details\\')) {
        importPath = '../../../styles/admin/TournamentDetails.module.css';
    } else if (file.includes('\\admin\\Tournaments\\')) {
        importPath = '../../../styles/admin/AdminTournaments.module.css';
    } else if (file.includes('\\createTeam\\')) {
        importPath = '../../styles/pages/CreateTeam.module.css';
    }
    
    if (importPath && !content.includes('import styles from')) {
        // Insert after first import or at top
        const firstImportEnd = content.indexOf(';\n', content.indexOf('import '));
        if (firstImportEnd !== -1) {
            content = content.slice(0, firstImportEnd + 2) + `import styles from "${importPath}";\n` + content.slice(firstImportEnd + 2);
        } else {
            content = `import styles from "${importPath}";\n` + content;
        }
        fs.writeFileSync(file, content);
        console.log(`Added import to ${file}`);
    }
}
