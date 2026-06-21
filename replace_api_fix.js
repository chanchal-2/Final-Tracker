const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'client/src'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let updatedContent = content.replace(/fetch\(`\/api\//g, 'fetch(`${import.meta.env.VITE_API_URL || \'\'}/api/');
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
