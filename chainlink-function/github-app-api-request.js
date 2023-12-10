const endpoint = "https://837a-185-219-141-30.ngrok-free.app"

const installationId = args[0]
const repoOwner = args[1]
const repoName = args[2]
const issueId = args[3]

const apiResponse = await Functions.makeHttpRequest({
  url: `${endpoint}/issue?installationId=${installationId}&repoOwner=${repoOwner}&repoName=${repoName}&issueId=${issueId}`,
  method: "GET",
  headers: {
    "ngrok-skip-browser-warning": true,
  },
})
if (apiResponse.error) {
  throw Error(`${apiResponse}`)
}
const { data } = apiResponse
console.log(JSON.stringify(data))
return Functions.encodeString(data.state)
