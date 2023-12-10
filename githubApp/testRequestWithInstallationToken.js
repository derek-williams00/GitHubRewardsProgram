const repoOwner = 'tobyloki';
const repoName = 'Playground';
const issueId = '1';
const installationToken = 'ghs_OxP4zVvNTAIM980Lmz5QsbVvWIWC0J0e3w2T';
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
console.log((await apiResponse.json()).state);