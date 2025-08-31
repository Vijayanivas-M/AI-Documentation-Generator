import google.generativeai as genai
import os
import inspect
from flask import Flask, request, render_template_string
from flask_cors import CORS

# Create the Flask application instance
app = Flask(__name__)
CORS(app)

def generate_documentation_from_string(code_content, file_name):
    prompt = f"""
Act as a senior software engineer and a technical writer.
You are generating documentation for a complete project.

This is a {os.path.splitext(file_name)[1].lstrip('.')} file named {file_name}.
Generate comprehensive documentation for the following code snippet.
The documentation must include:
1. A brief summary of what the code does.
2. An explanation of all parameters and what they are used for.
3. The expected return value.
4. A simple usage example.

Use Markdown formatting for a clean, readable output.

Code:

{code_content}

"""
    try:
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel("gemini-2.5-pro") 
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"An error occurred with the AI model: {e}"

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Use getlist() to handle multiple files
        files = request.files.getlist('code_file')
        
        if not files or files[0].filename == '':
            return "No files selected."
        
        all_documentation = ""
        for file in files:
            try:
                code_content = file.read().decode('utf-8')
                documentation_output = generate_documentation_from_string(code_content, file.filename)
                all_documentation += f"### Documentation for {file.filename}\n\n"
                all_documentation += documentation_output + "\n\n---\n\n"
            except Exception as e:
                all_documentation += f"### Error documenting {file.filename}\n\n"
                all_documentation += f"An error occurred: {e}\n\n---\n\n"

        return all_documentation

    return render_template_string("""
    <!doctype html>
    <title>DocuAI Project Generator</title>
    <h1>AI-Enhanced Project Documentation Generator</h1>
    <p>This is a backend for your React application.</p>
    """)

if __name__ == '__main__':
    app.run(debug=True)