const Axios = require('axios');
const shell = require('shelljs');
const fs = require('fs');


exports.getProtoFile = async (githubFilePath, fileName, options) => {
    const dir = await createFolder('./proto');
    const proto = await Axios.get(`https://raw.githubusercontent.com/${options.repositoryOwner}/${options.repository}/${options.githubBranch}/${githubFilePath}`, (err) => {
        if (err) throw new Error(err);
    });
    const file = fs.writeFile(`proto/${fileName}`, proto.data, (err) => {
        if (err) throw new Error(err);
    });
}

exports.generateProto = async (protoPath) => {
    try {
        const proto = await createFolder('./proto');
        const generated = await createFolder('./proto/generated');
        shell.exec(`grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./proto/generated --grpc_out=./proto/generated -I ./proto ./${protoPath}`);
        shell.exec(`grpc_tools_node_protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --ts_out=./proto/generated \
        -I ./proto \
        ./${protoPath}`);
    } catch (err) {
        throw new Error(err);
    }
}

const createFolder = async (dir) => {
    fs.mkdir(dir, err => {
        if (err && err.code != 'EEXIST') throw new Error(err);
    });
}

