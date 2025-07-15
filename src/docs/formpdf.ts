import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Cargar el HTML local
  const htmlPath = path.resolve(__dirname, '../templates/template.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  // Exportar como PDF
  await page.pdf({
    path: 'formulario.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
  });
  await browser.close();
})();

// para crear el pdf npx ts-node src/docs/formpdf.ts