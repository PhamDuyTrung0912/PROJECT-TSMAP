const fs = require('fs');
const path = require('path');

const directories = [
    'public/js',
    'public/css',
];

for (const directory of directories) {
    fs.readdir(directory, (err, files) => {
        console.log(files);
        if (err) throw err;

        for (const file of files) {
            console.log(file);
            // eslint-disable-next-line no-shadow
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
}
