from marshmallow import Schema, fields

class ServiceSchema(Schema):
    id = fields.Int()
    slug = fields.Str()
    title = fields.Str()
    problem = fields.Str()
    solution = fields.Str()
    features = fields.Str()
    use_cases = fields.Str()
    tools = fields.Str()

class PortfolioSchema(Schema):
    id = fields.Int()
    slug = fields.Str()
    title = fields.Str()
    client = fields.Str()
    problem = fields.Str()
    solution = fields.Str()
    result = fields.Str()
    tools = fields.Str()

class BlogSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    excerpt = fields.Str()
    image = fields.Str()
    category = fields.Str()
    content = fields.Str()
    created_at = fields.DateTime()

class TestimonialSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    quote = fields.Str()
    photo = fields.Str()

class AboutSchema(Schema):
    id = fields.Int()
    story = fields.Str()
    vision = fields.Str()
    mission = fields.Str()
    awards = fields.Str()
    team = fields.Str()

class CareerJobSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    department = fields.Str()
    location = fields.Str()
    type = fields.Str()
    description = fields.Str()

class ContactSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    email = fields.Str()
    message = fields.Str()
    created_at = fields.DateTime()

class JobApplicationSchema(Schema):
    id = fields.Int()
    job_id = fields.Int()
    job_title = fields.Str()
    name = fields.Str()
    email = fields.Str()
    phone = fields.Str()
    cover_letter = fields.Str()
    resume_path = fields.Str()
    created_at = fields.DateTime()
