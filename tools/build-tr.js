// Türkçe sürümü üretir: index.html (İngilizce, varsayılan) → tr/index.html
// Kullanım: node tools/build-tr.js   (index.html'de her değişiklikten sonra çalıştırın)
//
// Sayfa içeriği zaten { en, tr } verisinden geldiği için yalnızca iki şey değişir:
//   1) <html lang="en">  → <html lang="tr">   (Alpine dili buradan okur)
//   2) <!-- i18n-head --> ... <!-- /i18n-head --> bloğu → aşağıdaki Türkçe başlık etiketleri
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const trHead = `<!-- i18n-head -->
  <title>WECEP 2027 · Çevre, Temiz Enerji ve Ekonomi Politikası Çalıştayı</title>
  <meta name="description" content="Workshop on Environment, Clean Energy, and Economic Policy (WECEP 2027) — 18–19 Ocak 2027, Yıldız Teknik Üniversitesi Davutpaşa Kampüsü, İstanbul. Düzenleyen: YTÜ İİBF İktisat Bölümü." />
  <link rel="canonical" href="https://wecep.net/tr/" />
  <meta property="og:locale" content="tr_TR" />
  <meta property="og:locale:alternate" content="en_GB" />
  <meta property="og:url" content="https://wecep.net/tr/" />
  <meta property="og:description" content="18–19 Ocak 2027 · YTÜ Davutpaşa Kampüsü, İstanbul. Düzenleyen: YTÜ İİBF İktisat Bölümü." />
  <meta property="og:image:alt" content="WECEP 2027 çalıştay görseli" />
  <!-- /i18n-head -->`;

const headRe = /<!-- i18n-head -->[\s\S]*?<!-- \/i18n-head -->/;
if (!headRe.test(src) || !src.includes('<html lang="en">')) {
  console.error('HATA: index.html içinde <html lang="en"> veya i18n-head bloğu bulunamadı.');
  process.exit(1);
}

const out = src
  .replace('<html lang="en">', '<html lang="tr">')
  .replace(headRe, trHead)
  .replace('<!doctype html>', '<!doctype html>\n<!-- OTOMATİK ÜRETİLDİ: tools/build-tr.js — bu dosyayı düzenlemeyin, index.html\'i düzenleyip betiği çalıştırın. -->');

fs.mkdirSync(path.join(root, 'tr'), { recursive: true });
fs.writeFileSync(path.join(root, 'tr', 'index.html'), out);
console.log('tr/index.html üretildi (' + (out.length / 1024).toFixed(1) + ' KB)');
