import * as child_process from 'child_process';
import * as util from 'util';

const execFile = util.promisify(child_process.execFile);

async function runChildProc() {
    execFile('pandoc', ['.\\src\\slides\\sample-slide.md'])
        .then((stdout) => {
            console.log('Successfully executed.');
            console.log(stdout.stdout);
        })
        .catch((err) => {
            console.log('Error!');
            console.log(err);
        });
}

runChildProc();
