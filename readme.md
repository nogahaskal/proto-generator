# proto-generator

Proto-generator is a package for protocol buffers in node. 

## Installation

Use the package manager [npm](https://www.npmjs.com/package/proto-generator) to install proto-generator.

```bash
npm install proto-generator
```
## Proto from github
Use the getProtoFile method to get your .proto from another service in github into your own code.

## Generate your .proto 
Use the generateProto method to generate your .proto into node and typescript!
## Usage

```node
const protoGenerator = require('proto-generator');

options = {
    repositoryOwner: 'myGithubUser',
    repository: 'myRepo',
    githubProtoPath: 'proto/myProto.proto',
    githubBranch: 'master',
}

protoGenerator.getProtoFile('myProto.proto' , options) # creates a new proto folder with the proto file inside
protoGenerator.generateProto('proto/myProto.proto')  # generates the proto file into node and typescript

```