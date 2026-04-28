import fitz  # PyMuPDF
import io

def extract_text_from_pdf(file_bytes: io.BytesIO) -> str:
    """Extract plain text from a PDF file."""
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        full_text = []
        for page in doc:
            full_text.append(page.get_text("text"))
        doc.close()
        return "\n".join(full_text).strip()
    except Exception as e:
        raise ValueError(f"Failed to parse PDF: {str(e)}")
