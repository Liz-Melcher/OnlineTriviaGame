import { categories } from "./categories.js";

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

export { validDifficulty, validCategory, validDate }