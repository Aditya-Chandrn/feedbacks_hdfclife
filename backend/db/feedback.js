import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required to simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the data.json database file
const DB_FILE_PATH = path.join(__dirname, "data.json");

class Feedback {
  constructor(email, name, message) {
    this.email = email;
    this.name = name;
    this.message = message;
    this.votes = 0;
  }

  // Read and parse JSON data from DB file
  readDb() {
    return JSON.parse(fs.readFileSync(DB_FILE_PATH, "utf-8"));
  }

  // Write updated data to the DB file
  writeDb(data) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  // Create a new feedback entry with an auto-incremented ID
  create() {
    const db = this.readDb();
    const newId = db.meta.lastId + 1;

    db.feedbacks[newId] = this;
    db.meta.lastId = newId;

    this.writeDb(db);
    return true;
  }

  // Get a single feedback by ID
  getById(id) {
    const db = this.readDb();
    return db.feedbacks[id];
  }

  // Get all feedbacks as an array with ID included
  getAll() {
    const db = this.readDb();
    return Object.entries(db.feedbacks).map(([id, feedback]) => ({
      id,
      ...feedback,
    }));
  }

  // Delete feedback by ID
  deleteById(id) {
    const db = this.readDb();

    if (!db.feedbacks[id]) return false;

    delete db.feedbacks[id];
    this.writeDb(db);
    return true;
  }

  // Update allowed fields of feedback by ID
  updateById(id, data) {
    const db = this.readDb();

    if (!db.feedbacks[id]) return false;

    const allowedFields = ["email", "name", "message", "votes"];

    for (const field of Object.keys(data)) {
      if (allowedFields.includes(field)) {
        db.feedbacks[id][field] = data[field];
      }
    }

    this.writeDb(db);
    return db.feedbacks[id];
  }
}

export default Feedback;
