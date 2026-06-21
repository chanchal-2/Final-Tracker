import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'client', 'src');

function fixFetchCalls(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixFetchCalls(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // The buggy string starts with fetch(`${import.meta.env.VITE_API_URL || ''}/api/
            // and ends with a single quote instead of a backtick, e.g. me' instead of me`
            
            // Use regex to find those instances and replace the single quote with a backtick
            // Pattern: fetch(`${import.meta.env.VITE_API_URL || ''}/api/SOMETHING'
            const regex = /fetch\(`\$\{import\.meta\.env\.VITE_API_URL \|\| ''\}\/api\/([^']+)'/g;
            
            if (regex.test(content)) {
                const newContent = content.replace(regex, "fetch(`${import.meta.env.VITE_API_URL || ''}/api/$1`");
                fs.writeFileSync(fullPath, newContent);
                console.log(`Fixed ${fullPath}`);
            }
        }
    }
}

fixFetchCalls(directoryPath);
console.log('Done.');
