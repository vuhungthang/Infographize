Overview
--------

Infographize is a web application that automatically converts your text-based notes or content into a simple and clean infographic. This tool is perfect for students or anyone looking to quickly visualize information for easier understanding and presentation.

How It Works
------------

The user experience is designed to be simple and intuitive:

1.  **Access Page**: The user lands on the main page with a text input area.
    
2.  **Paste Content**: The user pastes their notes or any block of text into the provided field.
    
3.  **Wait for Processing**: Upon submission, the application sends the content to a Large Language Model (LLM) for processing.
    
4.  **See the Result**: The LLM returns an HTML page styled as an infographic. This page is then displayed directly within an iframe on the page.
    
5.  **Print or Save**: The user can then print the generated infographic or save it as a PDF from their browser.
    

Key Features
------------

*   **Content-to-Infographic Conversion**: Automatically restructures raw text into a visually organized HTML page.
    
*   **Synthesis Feature**: Before generating the infographic, users have the option to "synthesize" their content. This condenses the information, making the final infographic more focused and concise.
    
*   **Seamless Display**: The resulting infographic is loaded into an iframe for immediate viewing without leaving the page.
    
*   **Print-Friendly**: The output is designed to be easily printable for physical use.
    

Technical Flow
--------------

1.  **Rendering Page**: A static frontend page is served to the user.
    
2.  **Receiving Content**: The application receives the user's text input.
    
3.  **Processing with LLM**: The content is sent to the **OpenRouter LLM API**. The LLM is prompted to analyze, (optionally) synthesize, and reformat the text into a structured HTML infographic.
    
4.  **Returning Result**: The LLM API returns the complete HTML code for the infographic.
    
5.  **Loading in Iframe**: The application receives the HTML response and dynamically loads it into an iframe on the user's page.
    

Technologies Used
-----------------

*   **Frontend**: HTML, CSS, JavaScript
    
*   **Core Logic**: OpenRouter LLM API
    
*   **Display**: for embedding the final result</div></li></ul></x-turndown>
