from mixedbread import Mixedbread
from dotenv import load_dotenv
import os
import glob
from pathlib import Path
load_dotenv()


mxbai = Mixedbread(
    api_key=os.getenv("MXBAI_API_KEY"),
)

vector_store = mxbai.vector_stores.create(
    name="Apple Quarterly Reports",
    description="Apple Quarterly Reports from 2015 to 2025",
)

print(f"Vector store created: {vector_store.id}")

pdf_files = glob.glob("./data/*.pdf")

pdf_files = [f for f in pdf_files if f.lower().endswith('.pdf')]

print(f"Found {len(pdf_files)} PDF files to process")

for pdf_file in pdf_files:
    print(f"Uploading {pdf_file}...")
    try:
        mxbai.vector_stores.files.upload(
            vector_store_id=vector_store.id,
            file=Path(pdf_file),
        )
        print(f"Successfully uploaded {pdf_file}")
    except Exception as e:
        print(f"Error uploading {pdf_file}: {e}")

print("Done!")
