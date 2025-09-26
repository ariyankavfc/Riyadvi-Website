import json
import os
from datetime import datetime
from app import create_app
from extensions import db
from models import Service, Portfolio, BlogPost, Testimonial, About, CareerJob

app = create_app()

def load_json(filename):
    path = os.path.join(os.path.dirname(__file__), "data", filename)
    if not os.path.exists(path):
        print(f"⚠️ Missing {filename}")
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

with app.app_context():
    # ---- Services ----
    services = load_json("servicesDetails.json")
    if services:
        for s in services:
            exists = Service.query.filter_by(title=s["title"]).first()
            if not exists:
                db.session.add(Service(
                    slug=s["slug"],
                    title=s["title"],
                    problem=s.get("problem"),
                    solution=s.get("solution"),
                    features=json.dumps(s.get("features", [])),
                    use_cases=json.dumps(s.get("use_cases", [])),
                    tools=json.dumps(s.get("tools", [])),
                    cta=s.get("cta", "Get a Quote")
                ))
        print("✅ Services seeded (no duplicates).")

    # ---- Portfolio ----
    portfolio = load_json("portfolio.json")
    if portfolio:
        for p in portfolio:
            exists = Portfolio.query.filter_by(title=p["title"]).first()
            if not exists:
                db.session.add(Portfolio(
                    slug=p["slug"],
                    title=p["title"],
                    client=p.get("client"),
                    problem=p.get("problem"),
                    solution=p.get("solution"),
                    result=p.get("result"),
                    tools=json.dumps(p.get("tools", []))
                ))
        print("✅ Portfolio seeded (no duplicates).")

    # ---- Blog ----
    blog = load_json("blog.json")
    if blog:
        for post in blog.get("posts", []):
            exists = BlogPost.query.filter_by(title=post["title"]).first()
            if not exists:
                db.session.add(BlogPost(
                    title=post["title"],
                    excerpt=post["excerpt"],
                    image=post.get("image"),
                    category=post.get("category")
                ))
        print("✅ Blog posts seeded (no duplicates).")

    # ---- Testimonials ----
    testimonials = load_json("testimonials.json")
    if testimonials:
        for t in testimonials:
            exists = Testimonial.query.filter_by(name=t["name"], quote=t["quote"]).first()
            if not exists:
                db.session.add(Testimonial(
                    name=t["name"],
                    quote=t["quote"],
                    photo=t.get("photo")
                ))
        print("✅ Testimonials seeded (no duplicates).")

    # ---- About ----
    about_data = load_json("aboutData.json")
    if about_data:
        if not About.query.first():
            db.session.add(About(
                story=about_data.get("story"),
                vision=about_data.get("vision"),
                mission=about_data.get("mission"),
                awards=json.dumps(about_data.get("awards", [])),
                team=json.dumps(about_data.get("team", []))
            ))
            print("✅ About seeded.")
        else:
            print("ℹ️ About already exists (skipped).")

    # ---- Careers ----
    careers = load_json("careerData.json")
    if careers:
        for job in careers.get("jobs", []):
            exists = CareerJob.query.filter_by(title=job["title"]).first()
            if not exists:
                db.session.add(CareerJob(
                    title=job["title"],
                    department=job["department"],
                    location=job["location"],
                    type=job["type"],
                    description=job["description"]
                ))
        print("✅ Career jobs seeded (no duplicates).")

    db.session.commit()
    print("🎉 Seeding complete.")
