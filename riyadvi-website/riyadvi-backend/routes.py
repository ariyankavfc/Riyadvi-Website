import os, json
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from extensions import db, mail
from models import Service, Portfolio, BlogPost, Testimonial, About, CareerJob, ContactMessage, JobApplication
from schemas import ServiceSchema, PortfolioSchema, BlogSchema, TestimonialSchema, AboutSchema, CareerJobSchema, ContactSchema, JobApplicationSchema
from utils import save_uploaded_file

bp = Blueprint("api", __name__, url_prefix="/api")

@bp.get("/api/services")
def get_services():
    items = Service.query.all()
    return jsonify(ServiceSchema(many=True).dump(items))

@bp.get("/services/<slug>")
def get_service(slug):
    s = Service.query.filter_by(slug=slug).first_or_404()
    return jsonify(ServiceSchema().dump(s))

@bp.get("/api/portfolio")
def get_portfolio():
    items = Portfolio.query.all()
    return jsonify(PortfolioSchema(many=True).dump(items))

@bp.get("/api/portfolio/<slug>")
def get_portfolio_item(slug):
    p = Portfolio.query.filter_by(slug=slug).first_or_404()
    return jsonify(PortfolioSchema().dump(p))

@bp.get("/api/blog")
def get_blog():
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return jsonify(BlogSchema(many=True).dump(posts))

@bp.get("/api/testimonials")
def get_testimonials():
    t = Testimonial.query.all()
    return jsonify(TestimonialSchema(many=True).dump(t))

@bp.get("/api/about")
def get_about():
    a = About.query.first()
    if not a:
        return jsonify({}), 404
    return jsonify(AboutSchema().dump(a))

@bp.get("/api/careers")
def get_careers():
    jobs = CareerJob.query.all()
    return jsonify(CareerJobSchema(many=True).dump(jobs))

@bp.post("/api/contact")
def post_contact():
    data = request.get_json() or {}
    name = data.get("name"); email = data.get("email"); message = data.get("message")
    if not (name and email and message):
        return jsonify({"error":"name,email,message required"}), 400
    msg = ContactMessage(name=name, email=email, message=message)
    db.session.add(msg); db.session.commit()
    # optional mail notify
    try:
        from flask_mail import Message
        sender = current_app.config.get("MAIL_DEFAULT_SENDER")
        admin = current_app.config.get("MAIL_USERNAME")
        if admin:
            email_msg = Message(subject=f"Contact from {name}",
                                sender=sender, recipients=[admin],
                                body=f"Name: {name}\nEmail: {email}\n\n{message}")
            mail.send(email_msg)
    except Exception as e:
        current_app.logger.exception("mail failed: %s", e)
    return jsonify({"success":True}), 201

@bp.post("/api/apply")
def post_apply():
    job_id = request.form.get("job_id")
    job_title = request.form.get("job_title")
    name = request.form.get("name")
    email = request.form.get("email")
    phone = request.form.get("phone")
    cover_letter = request.form.get("cover_letter")
    if not (name and email and job_title):
        return jsonify({"error":"name,email,job_title required"}), 400
    resume = request.files.get("resume")
    resume_path = None
    if resume:
        resume_path = save_uploaded_file(resume, subfolder="resumes")
    app_record = JobApplication(job_id=job_id, job_title=job_title, name=name, email=email, phone=phone, cover_letter=cover_letter, resume_path=resume_path)
    db.session.add(app_record); db.session.commit()
    # notify via mail
    try:
        from flask_mail import Message
        admin = current_app.config.get("MAIL_USERNAME")
        sender = current_app.config.get("MAIL_DEFAULT_SENDER")
        if admin:
            email_msg = Message(subject=f"Application: {job_title} - {name}", sender=sender, recipients=[admin], body=f"Applicant: {name}\nEmail: {email}\nPhone: {phone}\nJob: {job_title}\n\nCover: {cover_letter}")
            if resume_path:
                try:
                    with open(os.path.join(os.path.dirname(__file__), resume_path),"rb") as f:
                        email_msg.attach(resume.filename, "application/octet-stream", f.read())
                except Exception:
                    current_app.logger.exception("attach fail")
            mail.send(email_msg)
    except Exception as e:
        current_app.logger.exception("mail failed: %s", e)
    return jsonify(JobApplicationSchema().dump(app_record)), 201

@bp.get("/api/uploads/<path:filename>")
def serve_uploads(filename):
    uploads = current_app.config.get("UPLOAD_FOLDER")
    return send_from_directory(uploads, filename)

@bp.get("/api/admin/contacts")
def admin_contacts():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify(ContactSchema(many=True).dump(messages))

@bp.get("/api/admin/applications")
def admin_applications():
    apps = JobApplication.query.order_by(JobApplication.created_at.desc()).all()
    return jsonify(JobApplicationSchema(many=True).dump(apps))
