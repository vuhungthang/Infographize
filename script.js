document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const newBtn = document.getElementById('newBtn');
    const printBtn = document.getElementById('printBtn');
    const synthesisBtn = document.getElementById('synthesisBtn');
    const textContent = document.getElementById('textContent');
    const loading = document.getElementById('loading');
    const loadingMessage = document.getElementById('loadingMessage');
    const resultFrame = document.getElementById('resultFrame');
    const resultContainer = document.getElementById('resultContainer');
    const actionButtons = document.getElementById('actionButtons');
    const mainHeading = document.querySelector('.container h1');
    const introParagraph = document.querySelector('.container p');
    const synthesisNote = document.getElementById('synthesisNote');

    const apiUrl = 'https://infographize-api.onrender.com/api/infographic';
    const synthesisApiUrl = 'https://infographize-api.onrender.com/api/synthesis';

    resultContainer.style.display = 'none';
    actionButtons.classList.add('hidden');

    const showHideForm = (show) => {
        const display = show ? '' : 'none';
        mainHeading.style.display = display;
        introParagraph.style.display = display;
        textContent.style.display = display;
        generateBtn.style.display = display;
        synthesisBtn.style.display = display;
        synthesisNote.style.display = display;
    };

    synthesisBtn.addEventListener('click', async () => {
        const content = textContent.value.trim();
        if (!content) {
            alert('Please enter some text to get started.');
            return;
        }

        showHideForm(false);
        loadingMessage.textContent = "Processing your content... This may take a moment.";
        loading.classList.remove('hidden');

        try {
            const response = await fetch(synthesisApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const synthesizedText = await response.text();
            const cleanedText = synthesizedText
                .replace(/^#+\s+/gm, '')
                .replace(/\*\*/g, '')
                .replace(/-\s/g, '  ')
                .trim();
            textContent.value = cleanedText;

        } catch (error) {
            console.error('Error synthesizing text:', error);
            alert('An error occurred while synthesizing the text. Please try again.');
        } finally {
            loading.classList.add('hidden');
            showHideForm(true);
        }
    });

    generateBtn.addEventListener('click', async () => {
        const content = textContent.value.trim();
        if (!content) {
            alert('Please enter some text to get started.');
            return;
        }

        // Hide input form
        showHideForm(false);

        loadingMessage.textContent = "Generating your infographic...";
        loading.classList.remove('hidden');
        resultContainer.style.display = 'none';
        actionButtons.classList.add('hidden');

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const infographicHtml = await response.text();

            resultFrame.srcdoc = infographicHtml;

            resultFrame.onload = () => {
                const iframeDoc = resultFrame.contentWindow.document;

                // Remove footer from generated content
                const footer = iframeDoc.querySelector('footer');
                if (footer) {
                    footer.remove();
                }

                const style = iframeDoc.createElement('style');
                style.textContent = `
                    @media print {
                        @page {
                            size: A4;
                            margin: 20mm;
                        }
                        body {
                            background: white !important;
                            color: black !important;
                        }
                        img {
                            max-width: 100% !important;
                        }
                        h1, h2, h3, h4, h5, h6, p, ul, ol {
                            page-break-inside: avoid;
                        }
                    }
                `;
                iframeDoc.head.appendChild(style);
                
                const iframeBody = resultFrame.contentWindow.document.body;
                const newHeight = iframeBody.scrollHeight;
                resultContainer.style.height = `${newHeight}px`;
            };
            
            resultContainer.style.display = 'block';
            actionButtons.classList.remove('hidden');

        } catch (error) {
            console.error('Error fetching infographic:', error);
            alert('An error occurred while generating the infographic. Please try again.');
        } finally {
            loading.classList.add('hidden');
        }
    });

    printBtn.addEventListener('click', () => {
        const frameWindow = resultFrame.contentWindow;
        if (frameWindow) {
            frameWindow.focus();
            frameWindow.print();
        } else {
            alert('Could not access the infographic content to print.');
        }
    });

    newBtn.addEventListener('click', () => {
        // Show input form
        showHideForm(true);

        // Hide results
        resultContainer.style.display = 'none';
        actionButtons.classList.add('hidden');

        // Reset content
        textContent.value = '';
        resultFrame.srcdoc = '';
    });
}); 