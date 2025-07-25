import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This will now correctly point to db/data.json regardless of where the server is run from
const DB_FILE_PATH = path.join(__dirname, "data.json");

class Feedback {
  constructor(email, name, message) {
    this.email = email;
    this.name = name;
    this.message = message;
    this.votes = 0;
  }

  readDb() {
    return JSON.parse(fs.readFileSync(DB_FILE_PATH, "utf-8"));
  }

  writeDb(data) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  create() {
    const db = this.readDb();
    const newId = db.meta.lastId + 1;

    db.feedbacks[newId] = this;
    db.meta.lastId = newId;
    this.writeDb(db);
    return true;
  }

  getById(id) {
    const db = this.readDb();
    const fb = db.feedbacks[id];

    if (!fb) return null;

    return new Feedback(fb.email, fb.name, fb.message);
  }

  getAll() {
    const db = this.readDb();
    const data = Object.entries(db.feedbacks).map(([id, feedback]) => ({
      id,
      ...feedback,
    }));

    return data;
  }

  deleteById(id) {
    const db = this.readDb();

    if (!db.feedbacks[id]) return false;

    delete db.feedbacks[id];
    this.writeDb(db);
    return true;
  }

  updateById(id, data) {
    const db = this.readDb();

    if (!db.feedbacks[id]) return false;
    const allowedFields = ["email", "name", "feedback", "vote"];

    for (const field of Object.keys(data)) {
      if (allowedFields.includes(field)) db.feedbacks[id][field] = data[field];
    }

    this.writeDb(db);
    return db.feedbacks[id];
  }
}

export default Feedback;
