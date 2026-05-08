from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import io

from pdf_parser import extract_text_from_pdf
from roaster import roast_resume

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Resume Roaster API is live 🔥")
    yield

app = FastAPI(title="Resume Roaster API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "Resume Roaster API is running 🔥"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/roast")
async def roast(
    job_description: str = Form(...),
    resume_text: str = Form(default=""),
    file: UploadFile = File(default=None),
):
    final_resume_text = resume_text.strip()

    if file and file.filename:
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        contents = await file.read()
        extracted = extract_text_from_pdf(io.BytesIO(contents))
        if not extracted.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF. Try pasting your resume instead.")
        final_resume_text = extracted

    if not final_resume_text:
        raise HTTPException(status_code=400, detail="Please provide a resume — either upload a PDF or paste the text.")

    if not job_description.strip():
        raise HTTPException(status_code=400, detail="Please provide a job description.")

    result = await roast_resume(final_resume_text, job_description)
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
