import { categories } from "./categories";

function validDifficulty(difficulty: string): boolean {
    const difficulties = ['easy', 'medium', 'hard'];
    return difficulties.includes(difficulty);
}

function validCategory(category: string): boolean {
    const categoryNames = categories.map(category => category.name);
    return categoryNames.includes(category);
}

function validDate(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
}

function validateUsername(username: string): boolean {
    const passwordRegex = /^[A-Za-z0-9]{6,30}$/;
    return passwordRegex.test(username);
}

function validatePassword(password: string): boolean {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{}|;:,.?<>]{6,30}$/;
    return passwordRegex.test(password);
}

export { validDifficulty, validCategory, validDate, validateUsername, validatePassword }