const gulp = require('gulp');
const fs = require('fs');
const archiver = require('archiver');
const del = require('del');
const AWS = require('aws-sdk');


const rootDirName = __dirname + '/lambda';

gulp.task('build-frontend', done => {
    const { exec } = require('child_process');

    if (!fs.existsSync(__dirname + '/frontend/node_modules')) {
        const child = exec('npm install', {
            stdio: [process.stdin, process.stdout, process.stderr],
            cwd: __dirname + '/frontend'
        });
        child.on('exit', (code, signal) => {
            const child_ = exec('npm run build', {
                stdio: [process.stdin, process.stdout, process.stderr],
                cwd: __dirname + '/frontend'
            });
            child_.on('exit', (code, signal) => done());
        });
    } else {
        const child = exec('npm run build', {
            stdio: [process.stdin, process.stdout, process.stderr],
            cwd: __dirname + '/frontend'
        });
        child.on('exit', (code, signal) => done());
    }
});

gulp.task('install-lambda', done => {
    const { exec } = require('child_process');

    if (!fs.existsSync(__dirname + '/lambda/node_modules')) {
        const child = exec('npm install', {
            stdio: [process.stdin, process.stdout, process.stderr],
            cwd: __dirname + '/lambda'
        });
        child.on('exit', (code, signal) => done());
    } else {
        done();
    }
});

gulp.task('pack', gulp.series('install-lambda', function() {
    return new Promise((resolve, reject) => {
        // create a file to stream archive data to.
        const output = fs.createWriteStream(`${rootDirName}/lambda.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', () => resolve(`${rootDirName}/lambda.zip`));

        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', () => console.log('Data has been drained'));

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', err => {
            if (err.code === 'ENOENT') {
                // log warning
                console.warn(err);
            } else {
                // throw error
                reject(err);
            }
        });

        // good practice to catch this error explicitly
        archive.on('error', err =>
            reject(err));

        // pipe archive data to the file
        archive.pipe(output);

        // append files from a glob pattern
        archive.directory(rootDirName + '/node_modules/', 'node_modules');
        archive.file(rootDirName + '/index.js', { name: 'index.js' });
        archive.file(rootDirName + '/adapter-creator.png', { name: 'adapter-creator.png' });

        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        archive.finalize();
    });
}));

gulp.task('clean', () =>
    del(['lambda/*/**', 'lambda/*', '!lambda/index.js', '!lambda/package.json', '!lambda/adapter-creator.png']));

gulp.task('test', done => {
    require('./test').then(result => {
        console.log(JSON.stringify(result));
        done();
    });
});

gulp.task('uploadLambda', done => {
    if (fs.existsSync(__dirname + '/config.json')) {
        AWS.config.loadFromPath(__dirname + '/config.json');
    }

    const lambda = new AWS.Lambda();
    const zip = fs.readFileSync(__dirname + '/lambda/lambda.zip');
    const params = {
        FunctionName: "adapterCreator",
        Publish: true,
        ZipFile: zip
    };
    lambda.updateFunctionCode(params, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.error(JSON.stringify(data));
        }
        done();
    });
});

gulp.task('default', gulp.series('pack'));
