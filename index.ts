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
    try {
        if (!options.githubBranch) options.githubBranch = 'master';
        await createFolder('./proto');
        const proto = await axios.get(`https://raw.githubusercontent.com/${options.repositoryOwner}/${options.repository}/${options.githubBranch}/${options.githubProtoPath}`);
        fs.promises.writeFile(`proto/${fileName}`, proto.data);
    } catch (err) {
        throw new Error(err);
    }
}

exports.generateProto = async (protoPath: string) => {
    try {
        await createFolder('./proto');
        await createFolder('./proto/generated');
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

