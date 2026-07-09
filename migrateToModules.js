import fs from 'fs';
import path from 'path';

const srcDir = 'c:/practice-Phanidhar/React-practice/src';

function toCamelCase(str) {
    return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    let needsManualReview = [];

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            needsManualReview = needsManualReview.concat(processDirectory(fullPath));
        } else if (fullPath.endsWith('.css') && file !== 'index.css') {
            // Process CSS file
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g, (match, className) => {
                return '.' + toCamelCase(className);
            });
            
            const newPath = fullPath.replace(/\.css$/, '.module.css');
            fs.writeFileSync(fullPath, content);
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed and updated: ${newPath}`);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            // Process JS/JSX file
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Update imports
            content = content.replace(/import\s+['"]([^'"]+\.css)['"]/g, (match, importPath) => {
                if (importPath.endsWith('index.css')) return match;
                modified = true;
                const newPath = importPath.replace(/\.css$/, '.module.css');
                return `import styles from "${newPath}"`;
            });

            // Update className="..."
            content = content.replace(/className=(['"])(.*?)\1/g, (match, quote, classes) => {
                if (!classes.trim()) return `className=""`;
                modified = true;
                const classArray = classes.split(/\s+/).filter(Boolean);
                if (classArray.length === 1) {
                    return `className={styles.${toCamelCase(classArray[0])}}`;
                }
                const stylesStr = classArray.map(c => `\${styles.${toCamelCase(c)}}`).join(' ');
                return `className={\`${stylesStr}\`}`;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
            }

            // Check for manual review cases (dynamic classNames or conditionals)
            if (content.match(/className=\{[^}]+\}/)) {
                // If it contains a template literal or an object/function
                if (content.match(/className=\{`/)) {
                    needsManualReview.push({ file: fullPath, reason: 'Template literal in className' });
                } else if (content.match(/className=\{.*?\?/)) {
                    needsManualReview.push({ file: fullPath, reason: 'Ternary in className' });
                } else if (content.match(/className=\{[A-Za-z]/)) {
                    // Check if it's NOT className={styles.xxx}
                    const complexClassNames = content.match(/className=\{[^}]+\}/g) || [];
                    const hasNonStyles = complexClassNames.some(c => !c.includes('styles.'));
                    if (hasNonStyles) {
                        needsManualReview.push({ file: fullPath, reason: 'Complex expression in className' });
                    }
                }
            }
        }
    }
    return needsManualReview;
}

const manualReview = processDirectory(srcDir);
if (manualReview.length > 0) {
    console.log('\n--- NEEDS MANUAL REVIEW ---');
    const unique = [];
    manualReview.forEach(m => {
        if (!unique.find(u => u.file === m.file)) unique.push(m);
    });
    unique.forEach(m => {
        console.log(`${m.file} - ${m.reason}`);
    });
}
