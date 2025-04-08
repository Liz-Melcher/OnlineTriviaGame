import React, { useState } from "react";

const CustomQuestions = () => {
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/customquestions/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('id_token')}`,
                },
                body: JSON.stringify({
                    question,
                    correct_answer: correctAnswer,
                    incorrect_answers: incorrectAnswers,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to add custom question");
            }

            alert("Custom question added successfully!");
        } catch (error) {
            console.error("Error adding custom question:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question:</label>
                <input value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
                <label>Correct Answer:</label>
                <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
            </div>
            <div>
                <label>Incorrect Answers:</label>
                {incorrectAnswers.map((answer, index) => (
                    <input
                        key={index}
                        value={answer}
                        onChange={(e) =>
                            setIncorrectAnswers((prev) =>
                                prev.map((a, i) => (i === index ? e.target.value : a))
                            )
                        }
                    />
                ))}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomQuestions;
