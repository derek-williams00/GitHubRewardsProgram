contract GitHubOracle {
    ChainlinkTokenInterface internal LINK;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    // Event to emit the response
    event RequestGitHubIssueFulfilled(
        bytes32 indexed requestId,
        string issueData
    );

    constructor(address _oracle, string memory _jobId, uint256 _fee, address _linkToken) {
        LINK = ChainlinkTokenInterface(_linkToken);
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
    }

    function requestGitHubIssueData(string memory _owner, string memory _repo, string memory _issue_number) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        request.add("get", string(abi.encodePacked("https://api.github.com/repos/", _owner, "/", _repo, "/issues/", _issue_number)));

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Callback function
    function fulfill(bytes32 _requestId, string memory _issueData) public recordChainlinkFulfillment(_requestId) {
        emit RequestGitHubIssueFulfilled(_requestId, _issueData);
    }

    // Helper function to convert string to bytes32
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        // Implementation...
    }
}
