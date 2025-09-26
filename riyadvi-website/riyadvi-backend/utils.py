from supabase import create_client
import os

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

def save_uploaded_file(file_storage, subfolder="resumes"):
    filename = file_storage.filename
    path = f"{subfolder}/{filename}"
    data = file_storage.read()
    supabase.storage.from_(os.getenv("SUPABASE_BUCKET")).upload(path, data)
    return f"{os.getenv('SUPABASE_URL')}/storage/v1/object/public/{os.getenv('SUPABASE_BUCKET')}/{path}"
