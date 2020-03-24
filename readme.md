# proto-generator

Proto-generator is a package for protocol buffers in node. 

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install proto-generator.

```bash
npm install proto-generator
```
## Proto from github
Use the getProtoFile method to download your .proto from another service in github into your own code.

## Generate your .proto 
Use the generateProto method to generate your .proto into node and typescript!
## Usage

```python
const protoGenerator = require('proto-generator');

options = {
    repositoryOwner: 'myUser',
    repository: 'myService',
    githubBranch: 'master',
}

protoGenerator.getProtoFile('proto/myService-service/myProto.proto', 'myProto.proto' , options) # creates a new proto folder with the proto file inside
protoGenerator.generateProto('proto/myProto.proto')  # generates the proto file into node and typescript

```