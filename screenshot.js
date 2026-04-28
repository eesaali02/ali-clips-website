const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900 });

    const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts and initial load
    await new Promise(r => setTimeout(r, 2000));

    // Scroll through page to trigger all ScrollTrigger animations
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
        await page.evaluate((y) => window.scrollTo(0, y), (pageHeight / steps) * i);
        await new Promise(r => setTimeout(r, 80));
    }
    // Scroll back to top for full-page screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
        path: 'screenshot-full.png',
        fullPage: true
    });

    // Hero section
    await page.screenshot({
        path: 'screenshot-hero.png',
        clip: { x: 0, y: 0, width: 1440, height: 900 }
    });

    // Services section
    const services = await page.$('#services');
    if (services) {
        await services.screenshot({ path: 'screenshot-services.png' });
    }

    // About section
    const about = await page.$('#about');
    if (about) {
        await about.screenshot({ path: 'screenshot-about.png' });
    }

    // Gallery section
    const gallery = await page.$('#gallery');
    if (gallery) {
        await gallery.screenshot({ path: 'screenshot-gallery.png' });
    }

    // FAQ section
    const faq = await page.$('#faq');
    if (faq) {
        await faq.screenshot({ path: 'screenshot-faq.png' });
    }

    // Contact section
    const contact = await page.$('#contact');
    if (contact) {
        await contact.screenshot({ path: 'screenshot-contact.png' });
    }

    await browser.close();
    console.log('Screenshots saved.');
})();
