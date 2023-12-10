import fs from 'fs';
import crypto from 'crypto';

const appId = '689240';
const privatePem = fs.readFileSync(
	'./gitrewardsprogram.2023-12-09.private-key.pem'
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

async function getInstallationToken(jwtToken, installationId) {
	const apiResponse = await fetch(
		`https://api.github.com/app/installations/${installationId}/access_tokens`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${jwtToken}`,
				'X-GitHub-Api-Version': '2022-11-28'
			}
		}
	);
	if (apiResponse.error) {
		throw Error('Request failed');
	}
	const installationToken = (await apiResponse.json()).token;
	return installationToken;
}

async function getIssue(repoOwner, repoName, issueId, installationToken) {
	const apiResponse = await fetch(
		`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueId}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${installationToken}`,
				'X-GitHub-Api-Version': '2022-11-28'
			}
		}
	);
	if (apiResponse.error) {
		throw Error('Request failed');
	}
	const ret = await apiResponse.json();
	return ret;
}

Bun.serve({
	port: 3000,
	async fetch(req) {
		const url = new URL(req.url);
		if (url.pathname === '/issue') {
			const queryParams = url.searchParams;
			const installationId = queryParams.get('installationId');
			const repoOwner = queryParams.get('repoOwner');
			const repoName = queryParams.get('repoName');
			const issueId = queryParams.get('issueId');

			const jwtToken = generateToken(appId, privatePem);

			const installationToken = await getInstallationToken(
				jwtToken,
				installationId
			);

			const issue = await getIssue(
				repoOwner,
				repoName,
				issueId,
				installationToken
			);

			const res = new Response(
				JSON.stringify({
					state: issue.state
				}),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			res.headers.set('Access-Control-Allow-Origin', '*');
			res.headers.set(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE, OPTIONS'
			);
			res.headers.set('Access-Control-Allow-Headers', '*');
			return res;
		}
		return new Response('404!');
	}
});

console.log('Listening on port 3000');
