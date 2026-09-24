import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
const dataDir=path.resolve('data'); fs.mkdirSync(dataDir,{recursive:true});
export const db=new Database(path.join(dataDir,'fashionoid.db'));
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'customer',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT,sku TEXT UNIQUE NOT NULL,name TEXT NOT NULL,category TEXT NOT NULL,description TEXT DEFAULT '',price INTEGER NOT NULL,compare_price INTEGER,stock INTEGER NOT NULL DEFAULT 0,image TEXT DEFAULT '',sizes TEXT DEFAULT '[]',colors TEXT DEFAULT '[]',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT,order_number TEXT UNIQUE NOT NULL,user_id INTEGER,customer_name TEXT NOT NULL,phone TEXT NOT NULL,address TEXT NOT NULL,city TEXT NOT NULL,pincode TEXT NOT NULL,payment_method TEXT NOT NULL,payment_status TEXT NOT NULL DEFAULT 'pending',order_status TEXT NOT NULL DEFAULT 'placed',subtotal INTEGER NOT NULL,total INTEGER NOT NULL,razorpay_order_id TEXT,razorpay_payment_id TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id));
CREATE TABLE IF NOT EXISTS order_items(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER NOT NULL,product_id INTEGER NOT NULL,name TEXT NOT NULL,sku TEXT NOT NULL,quantity INTEGER NOT NULL,price INTEGER NOT NULL,size TEXT,color TEXT,image TEXT,FOREIGN KEY(order_id) REFERENCES orders(id),FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS order_events(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER NOT NULL,status TEXT NOT NULL,note TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(order_id) REFERENCES orders(id));
`);
