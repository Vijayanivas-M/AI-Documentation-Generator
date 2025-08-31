import { useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import ReactMarkdown from 'react-markdown';

interface FormElements extends HTMLFormControlsCollection {
  code_file: HTMLInputElement;
}

interface FileUploadForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const DocGenPage = () => {
  const [documentation, setDocumentation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = async (event: React.FormEvent<FileUploadForm>) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    
    setLoading(true);
    setDocumentation("Generating documentation...");

    const fileInput = event.currentTarget.elements.code_file;
    const files = fileInput.files;

    if (!files || files.length === 0) {
      setDocumentation("No file selected.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('code_file', files[i]);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      setDocumentation(text);
    } catch (error: any) {
      setDocumentation(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        AI-Enhanced Code Documentation Generator
      </Typography>
      <Typography variant="body1" gutterBottom>
        Upload a Python, Java, or JavaScript file to generate documentation.
      </Typography>
      
      <form onSubmit={handleFileUpload}>
        <label htmlFor="code_file">
          Upload code file(s):
        </label>
        <input
          type="file"
          id="code_file"
          name="code_file"
          multiple
          required
          title="Select one or more code files to upload"
          placeholder="Choose code files"
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ ml: 2 }}>
          {loading ? 'Generating...' : 'Generate Documentation'}
        </Button>
      </form>

      <hr />
      
      {documentation && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Generated Documentation
          </Typography>
          {documentation && (
            <Box sx={{ mt: 4 }}>
                <Box sx={{ whiteSpace: 'pre-wrap', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <ReactMarkdown>{documentation}</ReactMarkdown>
                </Box>
            </Box>
)}
        </Box>
      )}
    </Box>
  );
};

export default DocGenPage;