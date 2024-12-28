const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
require('dotenv').config();

puppeteer.use(StealthPlugin());

// Función de retraso
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// Función de retraso con variación aleatoria
function randomDelay(base, variance) {
    return base + Math.random() * variance;
}


// Función para obtener la hora actual en Colombia
function getCurrentHourInColombia() {
    const now = new Date();
    const colombiaTimeOffset = -5; // UTC-5
    const utcHour = now.getUTCHours();
    return (utcHour + colombiaTimeOffset + 24) % 24; // Ajusta al rango 0-23
}

// Función para verificar si está dentro del horario permitido
function isWithinAllowedHours() {
    const hour = getCurrentHourInColombia();
    return hour >= 10 && hour <= 22; // Solo de 10 AM a 10 PM
}

(async () => {
    while (true) {
        // Validar horario antes de ejecutar
        if (!isWithinAllowedHours()) {
            console.log('Fuera del horario permitido (10 AM - 10 PM). Esperando 1 hora...');
            await delay(60 * 60 * 1000); // Esperar 1 hora
            continue; // Volver al inicio del bucle
        }

        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-notifications',
                '--lang=es-CO'
            ],
            defaultViewport: {
                width: 1366,
                height: 768
            }
        });

        const page = await browser.newPage();
        
        await page.setViewport({ width: 1366, height: 768 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        // Configurar timezone de Colombia
        await page.emulateTimezone('America/Bogota');

        try {

            // Credenciales desde variables de entorno
            const email = process.env.FB_EMAIL;
            const pass = process.env.FB_PASS;

            console.log('Iniciando sesión en Facebook...');
            await page.goto('https://www.facebook.com/');
            await page.type('#email', email, { delay: 100 });
            await page.type('#pass', pass, { delay: 100 });
            await page.click('button[name="login"]');
            await page.waitForNavigation();

            // Lista de grupos
            const grupos = [
                'https://www.facebook.com/groups/arriendosvillavicencion2/buy_sell_discussion/',
                'https://www.facebook.com/groups/2478553295566133/buy_sell_discussion/',
                'https://www.facebook.com/groups/910467287481485/buy_sell_discussion/',
                'https://www.facebook.com/groups/arriendoscomprasvillavicencio/buy_sell_discussion/',
                'https://www.facebook.com/groups/arriendosvillavicenciomet/buy_sell_discussion/',
                'https://www.facebook.com/groups/arriendosvillavicencioo/buy_sell_discussion/',
                'https://www.facebook.com/groups/603797970410735/buy_sell_discussion/',
                'https://www.facebook.com/groups/1751436125100006/buy_sell_discussion/',
                'https://www.facebook.com/groups/arriendoscompprasyventas/buy_sell_discussion/',
                'https://www.facebook.com/groups/arriendovillavicencio/buy_sell_discussion/',
                'https://www.facebook.com/groups/cambalachesvillavicencio/buy_sell_discussion/',
                'https://www.facebook.com/groups/1911200802488303/buy_sell_discussion/',
                'https://www.facebook.com/groups/arriendoapartamentovillavicencio/buy_sell_discussion/',
                'https://www.facebook.com/groups/mercadolibrevillavicencioo/buy_sell_discussion/',
                'https://www.facebook.com/groups/508069586212719/buy_sell_discussion/',
                'https://facebook.com/groups/708678989527908/buy_sell_discussion/',
                'https://www.facebook.com/groups/174682026221254/buy_sell_discussion/',
                'https://www.facebook.com/groups/2276478576005799/buy_sell_discussion/',
                'https://www.facebook.com/groups/2601744039902177/buy_sell_discussion/',
                'https://www.facebook.com/groups/1590439284559169/buy_sell_discussion/',
                'https://www.facebook.com/groups/323891252427481/buy_sell_discussion/',
                'https://www.facebook.com/groups/1672748923101603/buy_sell_discussion/',
                'https://www.facebook.com/groups/810090597612228/buy_sell_discussion/',
                'https://www.facebook.com/groups/1305868996162534/buy_sell_discussion/'
            ];
            const rutasImagenes = [
                'C:/Kike-Personal/git/facebook-automation/img/1.jpg'
            ];

            // Publicar en cada grupo con retraso
            for (const grupo of grupos) {
                console.log(`Publicando en: ${grupo}`);
                await publicarEnGrupo(page, grupo, rutasImagenes);
                console.log('Esperando 15 minutos para el siguiente grupo...');
                await delay(randomDelay(15*60*1000, 5*60*1000));// 15 a 20 minutos
            }

        } catch (error) {
            console.error('Error en el proceso:', error);
        } finally {
            await browser.close();
        }
    }
})();

async function publicarEnGrupo(page, grupo, rutasImagenes) {
	try {
		await page.goto(grupo, { waitUntil: 'networkidle2' });
		const escribirSelector = 'div[role="button"] span[style*="-webkit-line-clamp:2"]';
        await page.waitForSelector(escribirSelector, { timeout: 30000 });
		const escribirElemento = await page.$(escribirSelector);
        await escribirElemento.click();
		await delay(randomDelay(1000, 2000));

		// Escribir texto con saltos de línea
        const lineasTexto = [
            "Habitaciones Universitarias Villavicencio. SOLO ESTUDIANTES.",
            "https://wa.me/c/573053638927",
            "",
            "En el catálogo: Mira RESPUESTAS INMEDIATAS",
            "Cupos limitados.",
            "",
            "¡Asegura tu Lugar Ya!",
            "",
            "Solo whatsapp 305-363-8927",
            "",
            "Aprovecha descuentos por estadías de 6 o 12 meses.",
            "",
            "En el catálogo, ya encuentras toda la información.",
            "",
            "En whatsapp, solo das click en la foto de perfil.",
            "",
            "Para ver las habitaciones, primero nos confirmas:",
            "",
            "¿Se ajusta a tus necesidades la ubicación y tiempo mínimo?",
            "¿Dónde estudias?",
            "¿Por cuántos MESES requieres la habitación?",
            "¿Desde cuándo día/mes?",
            "",
            "@todos",
            "",
            "#UCCVillavicencio #SantotoVillavo #uantonionariño #UAN #SENA",
            "#UniDelMeta #UNIMINUTOVcio #UNAD #unillanos #sedebarcelona #unisystem",
            "#SantotoVillavo #UniDelMeta #UNIMINUTOVcio #UNAD #instituto #Cibertec #syspro",
            "#CERES #LiceoTecnológico #cuposlimitados #descuentos #oferta #Inandina",
            "#disponible #nuevo #arriendo #habitacionprivada #estudiantes #college #PrimerSemestre",
            "#habitacionestdiante #habitacionVillavicencio #habitacionuniversidad #Villavicencio #Meta #Colombia #HUAguasClaras"
        ];

        for (const linea of lineasTexto) {
            await page.keyboard.type(linea, { delay: 100 }); // Escribe cada línea
            await page.keyboard.press('Enter'); // Añade un salto de línea
        }

        try {
            // Selecciona el contenedor del botón "Foto/video" basado en su aria-label
            const photoButtonSelector = 'div[aria-label="Foto/video"]';

            // Espera que el botón esté presente
            await page.waitForSelector(photoButtonSelector, { timeout: 5000 });

            // Haz clic en el botón
            await page.click(photoButtonSelector);

            console.log('Botón "Foto/video" clickeado exitosamente.');
            

            // Adjuntar imágenes
            for (const rutaImagen of rutasImagenes) {
                await delay(randomDelay(1000, 2000));
                const addPhotoButtonSelector = 'div[role="button"] span:contains("Agregar fotos/videos")';
                await page.waitForSelector(addPhotoButtonSelector, { timeout: 10000 });
                await page.click(addPhotoButtonSelector);
            
                // Espera el input file y carga la imagen
                const fileInputSelector = 'input[type="file"]';
                await page.waitForSelector(fileInputSelector, { timeout: 12000 });
            
                // Sube la imagen (coloca la ruta correcta al archivo local)
                const filePath = rutaImagen; // Cambia esta ruta
                const inputFile = await page.$(fileInputSelector);
                await inputFile.uploadFile(filePath);

                await page.waitForSelector('input[type="file"]', { timeout: 15000 });
                const [fileChooser] = await Promise.all([
                    page.waitForFileChooser(),
                    page.click('div[aria-label="Foto/video"]')
                ]);
                await fileChooser.accept([rutaImagen]);

                // Esperar a que se cargue cada imagen
                await page.waitForSelector(`img[src*="${rutaImagen.split('/').pop()}"]`, { timeout: 10000 });
                console.log(`Imagen ${rutaImagen} cargada.`);
            }
        } catch (error) {
            console.error(`Error cargando las imagenes en: ${grupo}`, error);
        }

		// Publicar
		await page.waitForSelector('div[aria-label=\"Publicar\"]', { timeout: 5000 });
		await page.click('div[aria-label=\"Publicar\"]');

		console.log(`Publicado con imágenes en: ${grupo}`);
	} catch (error) {
		console.error(`Error publicando en ${grupo}:`, error);
	}
}	
