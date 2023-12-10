import { App } from 'octokit';

const app = new App({
	appId: '689240',
	privateKey: require('fs')
		.readFileSync('./gitrewardsprogram.2023-12-09.private-key.pem')
		.toString()
});

const installationId = 44945840;
const octokit = await app.getInstallationOctokit(installationId);

const ret = await octokit.request('/repos/tobyloki/Playground/issues/1');
console.log(ret.data);
