const apiResponse = await Functions.makeHttpRequest({
  url: `https://2766-185-219-141-30.ngrok-free.app/issue?installationId=44945840&repoOwner=tobyloki&repoName=Playground&issueId=1`,
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
