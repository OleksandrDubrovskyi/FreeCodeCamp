const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS campgrounds
        (id integer primary key, name, image TEXT)
        `;
    db.run(sql);
});

class Campground {
    static all(cb) {
        db.all('SELECT * FROM campgrounds', cb);
    }
    static find(id, cb) {
        db.get('SELECT * FROM campgrounds WHERE id = ?', id, cb);
    }
    static create(data, cb) {
        const sql = 'INSERT INTO campgrounds(name, image) VALUES (?, ?)';
        db.run(sql, data.name, data.image, cb);
    }
    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id'));
        db.run('DELETE FROM campgrounds WHERE id = ?', id, cb);
    }
}

module.exports = db;
module.exports.Campground = Campground;