## 
package.json: Added commands for setting up the client side server 
Added nodemon dependency 

server/package.json: updated file; added a dev script, nodemonConfig

client/tsconfig.json: added compilerOptions: jsx: react-jsx 

tsconfig.json - moved from server folder to root folder
added "jsx": "react-jsx"



##
Future ideas:
Next time, we need to agree on a front end and back end file structure at the beginning.  Merging the front and back end code and spinning it up, I'm getting a lot of errors related to file paths, and scripts in the package.json file 
client folder has a src folder
server folder does not 
