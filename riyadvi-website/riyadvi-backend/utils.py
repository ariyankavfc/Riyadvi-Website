import os, json
from werkzeug.utils import secure_filename
from flask import current_app

ALLOWED_EXTENSIONS = {"pdf", "doc", "docx"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def save_uploaded_file(file_storage, subfolder="resumes"):
    if not file_storage or not allowed_file(file_storage.filename):
        return None
    filename = secure_filename(file_storage.filename)
    upload_folder = current_app.config.get("UPLOAD_FOLDER")
    target_folder = os.path.join(upload_folder, subfolder)
    os.makedirs(target_folder, exist_ok=True)
    path = os.path.join(target_folder, filename)
    file_storage.save(path)
    # Return relative path from project root for serving
    return os.path.relpath(path, start=os.path.abspath(os.path.dirname(__file__)))
