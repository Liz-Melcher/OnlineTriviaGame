# Trivia Game Testing Checklist

## Functionality Testing

### Authentication
- [ ] Can a user register with valid credentials?
- [ ] Is form validation enforced during registration (e.g. required fields)?
- [ ] Can a user log in with valid credentials?
- [ ] Is JWT stored and used correctly to protect private routes?
- [ ] Is the user redirected to the home screen after login?
- [ ] Is logout functionality working properly?

### Game Flow
- [ ] Can the user start a new game with selected settings?
- [ ] Are categories, number of questions, and difficulty properly set?
- [ ] Do questions load properly for selected settings?
- [ ] Are answer choices shuffled and selectable?
- [ ] Does selecting an answer and clicking “Next Question” work correctly?
- [ ] Is the correctness of the answer shown before proceeding?
- [ ] Does the game end after the correct number of questions?
- [ ] Is the final score displayed with the option to play again?

### Save & Resume
- [ ] Can a game in progress be saved (e.g., mid-game)?
- [ ] Can a saved game be resumed accurately from where the user left off?

### Score History & Badges
- [ ] Is the user’s score stored after completing a game?
- [ ] Does the score history show correct metadata (date, category, difficulty, score)?
- [ ] Is the average score calculated and displayed correctly?
- [ ] Are badges awarded appropriately based on number of questions answered?

### User Settings
- [ ] Can a user change their password?
- [ ] Can the user clear score history?
- [ ] Can the user toggle light/dark mode?
- [ ] Can the user set a default difficulty? 
TODO: currently the difficulty is selected in each game; it does not pull in from the database from user settings 
- [ ] Can badges be cleared?

## 🖥️ UI/UX Testing
- [ ] Is the app responsive on different screen sizes (especially mobile)?
- [ ] Are key buttons and links clearly labeled and functional? 
TODO: Check home, log out, game settings, high scores, saved game 
TODO: is there a way from the home page to go back to a saved game? 
- [ ] Is the UI intuitive to navigate (home > start/continue game > settings)?
- [ ] Is the game visually polished (consistent styling, feedback on interaction)?
- [ ] Does toggling dark/light mode update the UI correctly?

## 🔌 API & Backend Testing
- [ ] Do GET routes return correct data (users, questions, scores)?
- [ ] Do POST routes correctly add new data (new game, score submission, user)?
- [ ] Are PATCH/PUT routes working where applicable (e.g., update password)?
- [ ] Are routes protected properly using JWT?
- [ ] Are API keys and sensitive data hidden using environment variables?
- [ ] Do API requests return expected responses (status codes, data structure)?

## 💾 Database Testing (PostgreSQL/Sequelize)
- [ ] Are user credentials securely stored?
- [ ] Is game state saved correctly (e.g., question index, score)?
- [ ] Are scores and badges associated with the correct user?
- [ ] Is data seeded correctly if applicable?
- [ ] Is there referential integrity (e.g., users → games → scores)?

## 🌐 Deployment Testing
- [ ] Is the app deployed on Render and loading with no errors?
- [ ] Are environment variables working correctly in production?
- [ ] Are database connections successful in production?
- [ ] Are protected routes inaccessible without authentication?

## 🧹 Code & Repository Checklist
- [ ] Code is organized using separation of concerns (e.g., routes, models, services).
- [ ] Files and folders are named consistently and clearly.
- [ ] Code is clean and readable (good indentation, comments).
- [ ] Commit messages are descriptive and frequent.
- [ ] README includes app name, description, technologies used, screenshot, and links.
