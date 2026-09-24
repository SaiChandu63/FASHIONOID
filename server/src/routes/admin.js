import {Router} from 'express';
import {db} from '../db.js';
import {auth,admin} from '../auth.js';
const r=Router(); r.use(auth,admin);
r.get('/dashboard',(req,res)=>{const sales=db.prepare("SELECT COALESCE(SUM(total),0) total FROM orders WHERE order_status!='cancelled'").get().total;res.json({products:db.prepare('SELECT COUNT(*) n FROM products WHERE active=1').get().n,customers:db.prepare("SELECT COUNT(*) n FROM users WHERE role='customer'").get().n,orders:db.prepare('SELECT COUNT(*) n FROM orders').get().n,sales});});
r.get('/orders',(req,res)=>{const limit=Math.min(Number(req.query.limit)||50,200);res.json(db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT ?').all(limit));});
r.patch('/orders/:id',(req,res)=>{const status=req.body?.status;const allowed=['placed','packed','shipped','delivered','cancelled'];if(!allowed.includes(status))return res.status(400).json({error:'Invalid order status'});const order=db.prepare('SELECT id FROM orders WHERE id=?').get(req.params.id);if(!order)return res.status(404).json({error:'Order not found'});db.prepare('UPDATE orders SET order_status=? WHERE id=?').run(status,req.params.id);db.prepare('INSERT INTO order_events(order_id,status,note) VALUES(?,?,?)').run(req.params.id,status,'Updated by admin');res.json({ok:true});});
r.get('/customers',(req,res)=>{const limit=Math.min(Number(req.query.limit)||100,500);res.json(db.prepare("SELECT id,name,email,role,created_at FROM users ORDER BY created_at DESC LIMIT ?").all(limit));});
export default r;
