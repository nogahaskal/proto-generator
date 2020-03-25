import axios from 'axios';
import * as fs from 'fs';
import shell from 'shelljs';

interface IOptions {
    repositoryOwner: string,
    repository: string,
    githubProtoPath: string,
    githubBranch: string,
}

exports.getProtoFile = async (fileName: string, options: IOptions) => {
    if (!options.githubBranch) options.githubBranch = 'master';
    const dir = await createFolder('./proto');
    const proto = await axios.get(`https://raw.githubusercontent.com/${options.repositoryOwner}/${options.repository}/${options.githubBranch}/${options.githubProtoPath}`, (err) => {
        if (err) throw new Error(err);
    });
    const file = fs.promises.writeFile(`proto/${fileName}`, proto.data);
}

exports.generateProto = async (protoPath: string) => {
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

const createFolder = async (dir: string) => {
    fs.mkdir(dir, err => {
        if (err && err.code != 'EEXIST') throw new Error(`Failed to create ${dir} directory: ${err}`);
    });
}

