import fs from 'fs';
import crypto from 'crypto';

const appId = '689240';
const privatePem = fs.readFileSync(
	'../gitrewardsprogram.2023-12-09.private-key.pem'
);

function generateToken(appId, privatePem) {
	// Read private key contents
	const private_key = crypto.createPrivateKey(privatePem);

	// Generate the JWT header and payload
	const header = Buffer.from(
		JSON.stringify({ alg: 'RS256', typ: 'JWT' })
	).toString('base64');
	const payload = Buffer.from(
		JSON.stringify({
			iat: Math.floor(Date.now() / 1000) - 60,
			exp: Math.floor(Date.now() / 1000) + 10 * 60,
			iss: appId
		})
	).toString('base64');

	// Create the signing string
	const signingString = `${header}.${payload}`;

	// Sign the JWT
	const signature = crypto.sign(
		'RSA-SHA256',
		Buffer.from(signingString),
		private_key
	);
	const jwtToken = `${signingString}.${signature.toString('base64')}`;

	return jwtToken;
}

const token = generateToken(appId, privatePem);
console.log(token);