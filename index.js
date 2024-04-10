const qr = require("qrcode");
const { promisify } = require("util");
const fs = require("fs");

// Transforma o retorno em Promise
const toDataURLAsync = promisify(qr.toDataURL);

const generateQRCode = async (texto, tamanho) => {
	try {
		const url = await toDataURLAsync(texto, {
			width: tamanho,
			height: tamanho,
		});

		const base64Data = url.split("base64,")[1];
		return base64Data;
	} catch (err) {
		console.error("Erro ao gerar QR code:", err);
		throw err;
	}
};

const saveQRCodeImage = async (texto, tamanho) => {
	try {
		const base64Data = await generateQRCode(texto, tamanho);

		const buffer = Buffer.from(base64Data, "base64");

		fs.writeFileSync("myQrCode.png", buffer);
		console.log("QR Code salvo com sucesso!");
	} catch (err) {
		console.error("Erro ao salvar QR Code:", err);
	}
};

// text, width x height (square)
saveQRCodeImage("message", 350);
