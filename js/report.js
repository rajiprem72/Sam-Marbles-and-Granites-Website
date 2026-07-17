const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxuu7-l43BhynGaxZ8Aqwk5UGWxP-E0JYsCIBwle8g5WV2T5DOREu3zd1RFVJq7cEwe0g/exec?action=report";


async function loadReport() {

    const container =
        document.getElementById(
            "report-container"
        );

    try {

        const response =
            await fetch(WEB_APP_URL);

        const data =
            await response.json();

        container.innerHTML = "";

        data.forEach(group => {

            const section =
                document.createElement("div");

            section.className =
                "date-group";

            section.innerHTML = `

                <h2 class="date-title">

                    ${group.date}

                </h2>

            `;

            group.records.forEach(record => {

                const card =
                    document.createElement("div");

                card.className =
                    "quote-card";

                card.innerHTML = `

                    <div class="quote-row">

                        <span class="quote-id">

                            ${record.quoteId}

                        </span>

                    </div>

                    <div class="quote-row">

                        <strong>Name:</strong>

                        ${record.name}

                    </div>

                    <div class="quote-row">

                        <strong>Mobile:</strong>

                        ${record.mobile}

                    </div>

                    <div class="quote-row">

                        <strong>Email:</strong>

                        ${record.email}

                    </div>

                    <div class="quote-details">

                        <strong>

                            Selected Items

                        </strong>

                        <ul class="items-list">

                            ${record.items
                                .map(
                                    item =>
                                        `<li>${item}</li>`
                                )
                                .join("")}

                        </ul>

                    </div>

                `;

                const quoteId =
                    card.querySelector(
                        ".quote-id"
                    );

                const details =
                    card.querySelector(
                        ".quote-details"
                    );

                quoteId.addEventListener(
                    "click",
                    () => {

                        details.style.display =
                            details.style.display ===
                            "block"
                            ? "none"
                            : "block";
                    }
                );

                section.appendChild(
                    card
                );

            });

            container.appendChild(
                section
            );

        });

    } catch (error) {

        container.innerHTML =

            "<p>Unable to load report.</p>";

        console.error(error);
    }
}

loadReport();
