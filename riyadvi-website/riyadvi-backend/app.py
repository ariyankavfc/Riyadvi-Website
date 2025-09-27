import os
from flask import Flask, url_for
from config import Config
from extensions import db, migrate, mail, cors
from routes import bp as api_bp

# Admin imports
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from markupsafe import Markup

# import models (these import db from extensions, no circular create_app call)
from models import (
    Service,
    Portfolio,
    BlogPost,
    Testimonial,
    About,
    CareerJob,
    ContactMessage,
    JobApplication,
)

def create_app():
    app = Flask(__name__, static_folder="static", template_folder="static")
    app.config.from_object(Config)

    # ensure uploads folder exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS")}})

    # register API blueprint
    app.register_blueprint(api_bp)

    # ---- Flask-Admin setup ----
    # create Admin instance AFTER extensions are initialized
    admin = Admin(app, name="Riyadvi Admin", template_mode="bootstrap4")

    # format resume_path to a downloadable link inside the admin list view
    def resume_link_formatter(view, context, model, name):
        if not model.resume_path:
            return ""
        # model.resume_path is a relative path (like "uploads/resumes/john.pdf" or "resumes/john.pdf")
        # Our API route for files is: /api/uploads/<path:filename> with blueprint 'api'
        # Use url_for to create the link to that endpoint
        try:
            # if model.resume_path contains leading "uploads/" remove it (routes expect the inner path)
            filename = model.resume_path
            # if path includes uploads/ remove the leading part
            filename = filename.replace("uploads/", "").lstrip("/")
            url = url_for("api.serve_uploads", filename=filename)
            return Markup(f'<a href="{url}" target="_blank" rel="noopener">Download</a>')
        except Exception:
            return model.resume_path or ""

    # Admin views
    admin.add_view(ModelView(Service, db.session))
    admin.add_view(ModelView(Portfolio, db.session))
    admin.add_view(ModelView(BlogPost, db.session))
    admin.add_view(ModelView(Testimonial, db.session))
    admin.add_view(ModelView(CareerJob, db.session))

    # JobApplication view with custom columns/formatter
    class JobApplicationAdmin(ModelView):
        column_list = ("id", "job_title", "name", "email", "phone", "resume_path", "created_at")
        column_searchable_list = ("name", "email", "job_title")
        column_filters = ("job_title", "created_at")
        column_formatters = {
            "resume_path": resume_link_formatter
        }
        form_excluded_columns = ("created_at", )

    admin.add_view(JobApplicationAdmin(JobApplication, db.session))

    # ContactMessage admin
    class ContactMessageAdmin(ModelView):
        column_list = ("id", "name", "email", "message", "created_at")
        column_searchable_list = ("name", "email")
        form_excluded_columns = ("created_at",)

    admin.add_view(ContactMessageAdmin(ContactMessage, db.session))

    # ---- end admin setup ----

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
