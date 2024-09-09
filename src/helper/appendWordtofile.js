// AppendToFile.js
import fs from 'fs';

const appendWordToFile = async( word) => {
    const filePath = "../wordList.txt"
    // Open the file in append mode (flag 'a')
    await fs.open(filePath, 'a', async(err, fd) => {
        if (err) {
            console.error(`Error opening file: ${err}`);
            return;
        }

        // Append the word followed by a newline
        await fs.write(fd, `${word}\n`, (err) => {
            if (err) {
                console.error(`Error writing to file: ${err}`);
            } else {
                console.log('Word appended successfully');
            }

            // Close the file
            fs.close(fd, (err) => {
                if (err) {
                    console.error(`Error closing file: ${err}`);
                }
            });
        });
    });
};

export default appendWordToFile;
