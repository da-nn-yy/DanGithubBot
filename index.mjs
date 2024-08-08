// import jsonfile from 'jsonfile';
// import moment from 'moment';
// import simpleGit from 'simple-git';
// import random from 'random';

// const FILE_PATH = './data.json';

// const makeCommit = n => {
//   if (n === 0) return simpleGit().push();
//   const x = random.int(0, 54);
//   const y = random.int(0, 6);
//   const DATE = moment().subtract(2, 'y').add(1, 'd')
//     .add(x, 'w').add(y, 'd').format();
//   const data = {
//     date: DATE
//   }
//   console.log(DATE);
//   jsonfile.writeFile(FILE_PATH, data, () => {
//     simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE },
//       makeCommit.bind(this, --n));
//   });
// }

// makeCommit(50);

import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const FILE_PATH = './data.json';

const makeCommitsInOneDay = (dayCommits, n) => {
  if (n === 0) return simpleGit().push();

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const baseDate = moment().subtract(2, 'y').add(1, 'd').add(x, 'w').add(y, 'd').startOf('day'); // Start of the day

  const commit = (count) => {
    if (count === dayCommits) {
      makeCommitsInOneDay(dayCommits, n - 1); // Move to the next day
      return;
    }

    const DATE = baseDate.add(count, 'hours').format(); // Add hours for multiple commits in one day
    const data = { date: DATE };

    console.log(`Commit ${count + 1} Date: ${DATE}`);

    jsonfile.writeFile(FILE_PATH, data, () => {
      simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, () => {
        commit(count + 1); // Commit again within the same day
      });
    });
  };

  commit(0); // Start committing multiple times in one day
};

makeCommitsInOneDay(8, 10); // 3 commits per day, 50 total commits


//////// the above is for year /////

// import jsonfile from 'jsonfile';
// import moment from 'moment';
// import simpleGit from 'simple-git';


// const FILE_PATH = './data.json';

// const makeCommit = n => {
//   if (n === 0) return simpleGit().push();
//   const DATE = moment().subtract(12, 'd').format();
//   const data = {
//     date: DATE
//   }
//   console.log(DATE);
//   jsonfile.writeFile(FILE_PATH, data, () => {
//     simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE },
//       makeCommit.bind(this, --n));
//   });
// }

// makeCommit(103);
