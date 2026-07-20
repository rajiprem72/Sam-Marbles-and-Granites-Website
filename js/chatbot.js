const CHATBOT_URL =
    "https://script.google.com/macros/s/AKfycbyKkOOZsHydc4WROm0lFIYePt7im97UtBfL-mqQOe9PNe206F5otgqa57h96hteFlsycw/exec";


async function sendMessage() {

    const input =
        document.getElementById(
            "chat-input"
        );

    const message =
        input.value.trim();

    if (!message) return;

    document.getElementById(
        "chat-messages"
    ).innerHTML += `
        <p><b>You:</b> ${message}</p>
    `;

    input.value = "";

    const response = await fetch(
        CHATBOT_URL,
        {
            method: "POST",

            mode: "no-cors",

            body: JSON.stringify({
                message: message
            })
        }
    );

    document.getElementById(
        "chat-messages"
    ).innerHTML += `
        <p><b>AI:</b> Thinking...</p>
    `;
}
