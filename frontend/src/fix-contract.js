// Script para corrigir as barras invertidas no arquivo ContractManagement.tsx
// Este script NÃO é parte da aplicação, apenas uma ferramenta temporária

const fs = require('fs');

const filePath = '/components/ContractManagement.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remover as barras invertidas escapando as aspas
content = content.replace(/\\"/g, '"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Arquivo corrigido!');
