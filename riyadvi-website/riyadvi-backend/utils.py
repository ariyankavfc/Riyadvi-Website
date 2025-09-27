from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def save_uploaded_file(file_storage, subfolder="resumes"):
    if not file_storage:
        return None

    filename = file_storage.filename

    # ✅ Upload to Supabase if configured
    if supabase:
        path = f"{subfolder}/{filename}"
        supabase.storage.from_(os.getenv("SUPABASE_BUCKET")).upload(path, file_storage.read())
        return f"{SUPABASE_URL}/storage/v1/object/public/{os.getenv('SUPABASE_BUCKET')}/{path}"

    # ✅ Otherwise save locally
    upload_folder = os.getenv("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, filename)
    file_storage.save(file_path)
    return file_path
