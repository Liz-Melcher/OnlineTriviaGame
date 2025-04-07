## 
package.json: Added commands for setting up the client side server 
Added nodemon dependency 

server/package.json: updated file; added a dev script, nodemonConfig
server/tsconfig.json: this file does exist, changed options because there is no src folder, needed to change the way the compiler options were working 

client/tsconfig.json: added compilerOptions: jsx: react-jsx 

tsconfig.json - moved from server folder to root folder
added "jsx": "react-jsx"

moved interfaces from root folder to server folder to correct this error:  [nodemon] starting `npx tsc && node dist/server.js`
[0] routes/game.ts(3,32): error TS6059: File '/repos/OnlineTriviaGame/interfaces/ClientQuestion.ts' is not under 'rootDir' 'repos/OnlineTriviaGame/server'. 'rootDir' is expected to contain all source files.
[0] [nodemon] app crashed - waiting for file changes before starting...

server/package.json changed type to commonjs to prevent this error: 
[0] ReferenceError: exports is not defined in ES module scope
[0] This file is being treated as an ES module because it has a '.js' file extension and 'repos/OnlineTriviaGame/server/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.

## 
Can we move the fetch questions to the server side to get rid of the error on TriviaGame.tsx? 




##
Future ideas:
Next time, we need to agree on a front end and back end file structure at the beginning.  Merging the front and back end code and spinning it up, I'm getting a lot of errors related to file paths, and scripts in the package.json file 
client folder has a src folder
server folder does not 
