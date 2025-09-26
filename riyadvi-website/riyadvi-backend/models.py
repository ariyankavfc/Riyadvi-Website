from datetime import datetime
from extensions import db

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    problem = db.Column(db.Text)
    solution = db.Column(db.Text)
    features = db.Column(db.Text)  # JSON string
    use_cases = db.Column(db.Text) # JSON string
    tools = db.Column(db.Text)     # JSON string

class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    client = db.Column(db.String(200))
    problem = db.Column(db.Text)
    solution = db.Column(db.Text)
    result = db.Column(db.String(300))
    tools = db.Column(db.Text)

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    excerpt = db.Column(db.Text)
    image = db.Column(db.String(500))
    category = db.Column(db.String(120))
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    quote = db.Column(db.Text)
    photo = db.Column(db.String(500))

class About(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    story = db.Column(db.Text)
    vision = db.Column(db.Text)
    mission = db.Column(db.Text)
    awards = db.Column(db.Text)  # JSON string
    team = db.Column(db.Text)    # JSON string

class CareerJob(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    department = db.Column(db.String(120))
    location = db.Column(db.String(150))
    type = db.Column(db.String(80))
    description = db.Column(db.Text)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class JobApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('career_job.id'), nullable=True)
    job_title = db.Column(db.String(250))
    name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    phone = db.Column(db.String(80))
    cover_letter = db.Column(db.Text)
    resume_path = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    job = db.relationship('CareerJob', backref=db.backref('applications', lazy='dynamic'))
