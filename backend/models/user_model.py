def create_user(db, email, password):
    user = {
        "email": email,
        "password": password
    }
    return db.users.insert_one(user)

def find_user_by_email(db, email):
    return db.users.find_one({"email": email})