import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'client', 'src');

function replaceFetchCalls(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceFetchCalls(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // replace fetch('/api/... with fetch(`${import.meta.env.VITE_API_URL || ''}/api/...
            if (content.includes("fetch('/api/")) {
                const newContent = content.replace(/fetch\('\/api\//g, "fetch(`${import.meta.env.VITE_API_URL || ''}/api/");
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceFetchCalls(directoryPath);
console.log('Done.');
